import prisma from "@/app/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = await prisma.product.findFirst({
    where: {
      id: id as string,
    },
  });
  return new Response(JSON.stringify(data));
}
