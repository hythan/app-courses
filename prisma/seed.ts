import { PrismaClient } from '@prisma/client';
import { BcryptService } from '../src/helpers/bcrypt.service';

const prisma = new PrismaClient();
const bcrypt = new BcryptService();

async function main() {
  const pass = await bcrypt.encrypt('admin');
  await prisma.admins.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      password: pass,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
