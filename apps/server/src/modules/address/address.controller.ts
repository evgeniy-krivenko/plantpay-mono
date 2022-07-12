import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { UserFromReq } from '../auth/decorators/user.decorator';
import { User } from '../auth/user.entity';

@UseGuards(JwtAccessGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/')
  getAll() {
    return this.addressService.getAll();
  }

  @Post('/')
  create(@Body() dto: CreateAddressDto, @UserFromReq() { id: userId }: User) {
    return this.addressService.create(dto, userId);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: Partial<CreateAddressDto>, @UserFromReq() { id: userId }: User) {
    return this.addressService.update(dto, id, userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.addressService.delete(id);
  }
}
