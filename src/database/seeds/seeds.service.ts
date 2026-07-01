import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/modules/users/entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(UserRole)
    private readonly roleRepository: Repository<UserRole>,
  ) {}

  async seed() {
    await this.seedUserRoles();
  }

  private async seedUserRoles() {
    await this.roleRepository.upsert(
      [
        { name: 'admin', description: 'Administrator' },
        { name: 'doctor', description: 'Medical Doctor' },
        { name: 'patient', description: 'Patient' },
      ],
      ['name'],
    );
  }
}
