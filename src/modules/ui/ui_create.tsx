"use client";

import {
  ActionIcon,
  Button,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { ITypeOfProduct } from "../interface/type";
import _ from "lodash";

type ICreateProduct = Prisma.ProductGetPayload<{
  select: { name: true; price: true; typeOfProductId: true };
}>;

export function UiCreate() {
  const router = useRouter();
  const [data, setData] = useState<ICreateProduct>({
    name: "",
    price: "",
    typeOfProductId: "",
  });

  const [selectType, setSelectType] = useState<ITypeOfProduct[]>([]);
  console.log(selectType, "ini state");

  useShallowEffect(() => {
    onLoadType({
      onLoadData(data) {
        console.log(data, "ini di use slow");
        setSelectType(data);
      },
    });
  }, [setSelectType]);

  async function onLoadType({
    onLoadData,
  }: {
    onLoadData: (data: ITypeOfProduct[]) => void;
  }) {
    const type = await fetch("/api/get/type");
    const res = await type.json();

    onLoadData(res);
  }

  async function onCreate() {
    const create = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await create.json();

    if (create.status === 200) {
      console.log(res.status);
      router.back();
    }
  }

  // const [selectType, setSelectType] = useState<string | null>(null);

  return (
    <>
      <Stack p={"sm"} w={200}>
        <ActionIcon onClick={() => router.back()}>
          <IoChevronBack />
        </ActionIcon>
        <TextInput
          label="Name"
          placeholder="Product Name"
          onChange={(val) => setData({ ...data, name: val.target.value })}
        />
        <TextInput
          label="Price"
          placeholder="Product Price"
          onChange={(val) => setData({ ...data, price: val.target.value })}
        />
        {_.isEmpty(selectType) ? (
          <Loader />
        ) : (
          <Select
            label="Type"
            placeholder="Product Type"
            data={
              _.isEmpty(selectType)
                ? []
                : selectType.map((e) => ({
                    value: e.id + "",
                    label: e.name + "",
                  }))
            }
            onChange={(val) => {
              console.log(val);
              setData({ ...data, typeOfProductId: val + "" });
            }}
          />
        )}

        <Button color="green" onClick={() => onCreate()}>
          Simpan
        </Button>
      </Stack>
    </>
  );
}
