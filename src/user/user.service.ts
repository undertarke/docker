import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaMySQLService, PrismaPostgreService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private prismaPostgresService: PrismaPostgreService,
    private prismaMySQLService: PrismaMySQLService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    let model = {
      customer_id: 0,
      name: "",
      email: "",
      phone: ""
    }
    await this.prismaPostgresService.customers.create({ data: model })
    await this.prismaPostgresService.customers.update({ data: model, where: { customer_id: 0 } })

    return ""
  }

  async findAll() {
    // SELECT * FROM customers WHERE customer_id = 0
    return await this.prismaPostgresService.customers.findMany();

  }

  async findMany() {
    return await this.prismaMySQLService.customers.findMany();

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
