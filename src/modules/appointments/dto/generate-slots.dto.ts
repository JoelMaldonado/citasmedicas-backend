import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class GenerateSlotsDto {
  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' },
  )
  startDate: string;

  @IsOptional()
  @IsInt({ message: 'La cantidad de días debe ser un número entero' })
  @Min(1, { message: 'La cantidad de días debe ser al menos 1' })
  days?: number;
}
