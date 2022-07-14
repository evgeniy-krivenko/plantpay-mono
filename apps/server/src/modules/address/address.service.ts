import { Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { AddressModel } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { v4 } from 'uuid';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<AddressModel[]> {
    return this.prismaService.addressModel.findMany();
  }

  async create({ address, name, surname, phone }: CreateAddressDto, userId: number): Promise<AddressModel> {
    return this.prismaService.addressModel.create({
      data: {
        id: v4(),
        name,
        phone,
        surname,
        address,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update({ address, name, surname, phone }: Partial<CreateAddressDto>, id: string, userId: number): Promise<AddressModel> {
    return this.prismaService.addressModel.update({
      where: { id },
      data: { address, name, surname, phone },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.addressModel.delete({ where: { id } });
  }

  async getOne(addressId: string, userId: number): Promise<AddressModel> {
    return this.prismaService.addressModel.findFirst({ where: { id: addressId, userId } });
  }
}
