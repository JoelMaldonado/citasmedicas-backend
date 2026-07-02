import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoleName } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleName.ADMIN)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }
}
