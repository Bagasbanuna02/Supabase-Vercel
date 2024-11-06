"use client";

import {
  ActionIcon,
  Group,
  Skeleton,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { CreateButton } from "../button/create";
import { IProduct } from "../interface/type";
import _ from "lodash";

export function UiDashboard() {
  const [data, setData] = useState<IProduct[]>([]);

  useShallowEffect(() => {
    getProducts({
      onLoadData(data) {
        setData(data);
      },
    });
  }, [setData]);
  async function getProducts({
    onLoadData,
  }: {
    onLoadData: (data: IProduct[]) => void;
  }) {
    const products = await fetch("/api/get/product", {});
    const data = await products.json();

    onLoadData(data);
  }

  const rows = data.map((e, i) => (
    <Table.Tr key={i}>
      <Table.Td>{e.name}</Table.Td>
      <Table.Td>{e.price}</Table.Td>
      <Table.Td>{e.name}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon color="green">
            <FiEdit3 />
          </ActionIcon>

          <ActionIcon color="red">
            <FiTrash2 />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack p={"sm"}>
      <Group justify="space-between">
        <Title order={3}>Dashboard</Title>
        <Group gap={"xs"}>
          <CreateButton />
        </Group>
      </Group>

      {_.isEmpty(data) ? (
        <Skeleton height={400} />
      ) : (
        <Table withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Type </Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </Stack>
  );
}
