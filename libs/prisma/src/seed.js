const { PrismaClient } = require('@prisma/client');
const { hashSync } = require('bcrypt');

const prisma = new PrismaClient();

const main = async () => {
  await prisma.roleModel.createMany({
    data: [
      { value: 'ADMIN', description: 'Роль администратора' },
      { value: 'BYIER', description: 'Роль покупателя' },
      { value: 'MODERATOR', description: 'Роль модератора' },
      { value: 'VENDOR', description: 'Роль продавца' },
    ],
  });
  const role = await prisma.roleModel.findFirst({
    where: { value: 'BYIER' },
  });
  const salt = Number(process.env.SALT) || 10;
  const user = await prisma.userModel.create({
    data: {
      email: 'vendor@email.com',
      name: 'vendor',
      surname: 'vendor surname',
      password: hashSync('vendor123', salt),
      roles: {
        create: {
          role: {
            connect: { id: role.id },
          },
        },
      },
      isVendor: false,
    },
  });
  return user;
};

main()
  .then((r) => console.log(r))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
