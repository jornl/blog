import { CategoryResource } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Table } from "@/Components/Table";

type IndexPageProps = {
  categories: PaginatedResponse<CategoryResource>;
};

export default function Index({ categories }: IndexPageProps) {
  console.log(categories);
  return (
    <AdminLayout>
      <Head title="Categories" />
      <Table zebra={true}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Slug</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {categories.data.map((category) => (
            <Table.Row key={category.id}>
              <Table.DataCell>{category.name}</Table.DataCell>
              <Table.DataCell>{category.slug}</Table.DataCell>
              <Table.DataCell>
                <a href="#">Edit</a>
                <a href="#">Delete</a>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AdminLayout>
  );
}
