import prisma from "@/app/lib/prisma";

export async function GET() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return new Response(JSON.stringify(data));
}
