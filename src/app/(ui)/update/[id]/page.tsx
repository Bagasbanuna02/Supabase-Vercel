type Params = Promise<{ id: string }>;

async function Page({ params }: { params: Params }) {
  const productId = (await params).id;
  console.log(productId);

  return <>hello</>;
}

export default Page;
