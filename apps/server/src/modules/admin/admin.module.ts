import AdminJS from 'adminjs';
// без этого `@adminjs/nestjs` по какой-то причине "не видит" `@aminjs/express`, необходимый ему для работы
// import '@adminjs/express';
import { AdminModule, AdminModuleOptions } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@plantpay-mono/prisma';
import uploadFeature from '@adminjs/upload';
import { ConfigModule, ConfigService } from '@nestjs/config';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    PrismaModule,
    AdminModule.createAdminAsync({
      imports: [PrismaModule, ConfigModule],
      inject: [PrismaService, ConfigService],
      useFactory: async (prisma: PrismaService, configService: ConfigService): Promise<AdminModuleOptions> => {
        const dmmf = (prisma as any)._dmmf as DMMFClass;
        return {
          shouldBeInitialized: !configService.get('CLI_TESTING'),
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: { model: dmmf.modelMap.UserModel, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.RoleModel, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.UsersOnRoles, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.ProductModel, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.ImageModel, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.CartModel, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.CartOnProduct, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.CategoryModel, client: prisma },
                options: {
                  editProperties: ['name', 'file', 'slug', 'icon'],
                  listProperties: ['id', 'name', 'mime', 'slug'],
                },
                features: [
                  uploadFeature({
                    provider: configService.get('CLI_TESTING')
                      ? { local: { bucket: 'tools' } }
                      : { local: { bucket: 'uploads' } },
                    properties: {
                      key: 'icon',
                      bucket: 'bucket',
                      mimeType: 'mime',
                    },
                    uploadPath: (record, name) => `categories/${name}`,
                  }),
                ],
              },
            ],
          },
        };
      },
    }),
  ],
})
export class AdminNestModule {}
