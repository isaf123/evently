import { PrismaClient } from '@prisma/client';
import { locations } from './data/location';
const prisma = new PrismaClient();
async function main() {
  for (const location of locations) {
    await prisma.masterLocation.create({ data: { location: location.name } });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
