import AdminJS from 'adminjs';
// без этого `@adminjs/nestjs` по какой-то причине "не видит" `@aminjs/express`, необходимый ему для работы
// import '@adminjs/express';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@plantpay-mono/prisma';
import uploadFeature from '@adminjs/upload';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    PrismaModule,
    AdminModule.createAdminAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: async (prisma: PrismaService) => {
        const dmmf = (prisma as any)._dmmf as DMMFClass;
        return {
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
                    provider: { local: { bucket: 'uploads' } },
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
