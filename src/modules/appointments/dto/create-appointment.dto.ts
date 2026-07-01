import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID('4', { message: 'El identificador del horario no es válido' })
  slotId: string;

  @IsOptional()
  @IsString({ message: 'El motivo de consulta debe ser un texto' })
  reason?: string;
}
