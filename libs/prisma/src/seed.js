const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  const count = await prisma.roleModel.createMany({
    data: [
      { value: 'ADMIN', description: 'Роль администратора' },
      { value: 'BYIER', description: 'Роль покупателя' },
      { value: 'MODERATOR', description: 'Роль модератора' },
      { value: 'VENDOR', description: 'Роль продавца' },
    ],
  });
  return count;
};

main()
  .then((r) => console.log(r))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
