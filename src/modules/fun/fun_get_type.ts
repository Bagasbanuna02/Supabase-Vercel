"use server";

import prisma from "@/app/lib/prisma";

export async function funGetType() {
  const data = await prisma.typeOfProduct.findMany({});

  return data;
}
