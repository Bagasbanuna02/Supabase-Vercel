import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/create")}>Tambah</Button>
    </>
  );
}
