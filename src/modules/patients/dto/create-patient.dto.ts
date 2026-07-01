import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePatientDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
