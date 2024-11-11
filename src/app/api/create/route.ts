// import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);

  // const create = await prisma.product.create({
  //   data: {
  //     name: data.name,
  //     price: data.price,
  //     typeOfProductId: data.typeId,
  //   },
  // });

  // if (!create) {
  //   return new Response(JSON.stringify({ error: "Error" }));
  // }

  return new Response(JSON.stringify({ status: "success" }));
}
