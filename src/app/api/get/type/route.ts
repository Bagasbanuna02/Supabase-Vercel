import prisma from "@/app/lib/prisma";

export async function GET() {
  const data = await prisma.typeOfProduct.findMany({});

  return new Response(JSON.stringify(data));
}
