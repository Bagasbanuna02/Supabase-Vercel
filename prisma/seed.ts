import prisma from "../src/app/lib/prisma";
import { typeProducts } from "../src/bin/index";

(async () => {
  console.log("start");

  for (const i of typeProducts) {
    await prisma.typeOfProduct.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
      },
      update: {
        name: i.name,
      },
    });
  }
})()
  .then(() => {
    console.log("success");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
