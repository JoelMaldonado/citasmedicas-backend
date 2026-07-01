import { IsUUID } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsUUID('4', { message: 'El identificador del nuevo horario no es válido' })
  newSlotId: string;
}
