import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { User } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService
  ) { }
  async create(createProductDto: CreateProductDto) {
    await this.prismaService.products.create({
      data: createProductDto
    })
    return 'This action adds a new product';
  }

  async findAll() {

    return await this.prismaService.products.findMany()
    // return "hello world !"
  }

  async findOne(id: number) {
    return await this.prismaService.products.findFirst({
      where: {
        id
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.prismaService.products.update({
      data: updateProductDto,
      where: {
        id
      }
    })
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    this.prismaService.products.delete({
      where: { id }
    })
    return `This action removes a #${id} product`;
  }


  order(order,user) {


    let newOrder = {
      product_id: order.productId,
      order_date: new Date(),
      quantity: order.quantity,
      customer_id: ""
    }
  }
}
