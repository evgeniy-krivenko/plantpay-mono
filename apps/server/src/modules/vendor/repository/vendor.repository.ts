import { Injectable } from '@nestjs/common';
import { PrismaService } from '@plantpay-mono/prisma';
import { Vendor } from '../vendor.entiry';
import { VendorMapper } from './vendor.mapper';

@Injectable()
export class VendorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getVendorsByIds(ids: number[]): Promise<Vendor[] | null> {
    const usersModel = await this.prismaService.userModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: { roles: { select: { role: true } } },
    });
    if (!usersModel) {
      return null;
    }
    return usersModel.map((user) => VendorMapper.mapToDomain(user));
  }
}
