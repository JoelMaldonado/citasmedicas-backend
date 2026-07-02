# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1: build
# Installs full dependencies (incl. devDependencies, needed for `nest build`)
# and compiles TypeScript -> dist/.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# package.json has no "packageManager" field to auto-pin from, so pin the
# exact pnpm version used in local dev explicitly for a reproducible build.
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

# Copy only the manifest + lockfile first so this layer is cached across
# rebuilds whenever application source changes but dependencies don't.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------------------------------------------------------------------------
# Stage 2: runtime
# Production-only dependencies + compiled output, running as a non-root user.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

# bcrypt ships prebuilt N-API binaries for both glibc and musl bundled
# directly in the npm package (node_modules/bcrypt/prebuilds/linux-x64/
# {bcrypt.glibc.node,bcrypt.musl.node}), resolved at require() time based on
# the actual runtime libc. No build toolchain (python3/make/g++) is needed
# on Alpine, and there's no cross-stage glibc/musl mismatch risk.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
USER nestjs

# Documents the app's own fallback default (process.env.PORT || 3000 in
# main.ts). Actual published port is controlled by docker-compose.yml's
# ports: mapping via ${PORT}, independent of this EXPOSE declaration.
EXPOSE 3000

CMD ["node", "dist/main"]
