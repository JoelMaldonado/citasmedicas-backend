import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
