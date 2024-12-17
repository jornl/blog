import { CategoryResource } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "@/Components/Table";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Header from "@/Components/Topography/Header";

type IndexPageProps = {
  categories: PaginatedResponse<CategoryResource>;
};

export default function Index({ categories }: IndexPageProps) {
  console.log(categories);
  return (
    <AdminLayoutProvider>
      <Head title="Categories" />
      <div className="my-5 px-4">
        <Breadcrumbs />
        <Header>Categories</Header>

        <Table zebra={true} className="my-5">
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
                <Table.DataCell>
                  <Link
                    className="hover:text-primary"
                    href={route("admin.categories.show", category.slug)}
                  >
                    {category.name}
                  </Link>
                </Table.DataCell>
                <Table.DataCell>{category.slug}</Table.DataCell>
                <Table.DataCell className="text-right">
                  <Link
                    className="btn btn-sm btn-primary btn-outline mr-5"
                    href={route("admin.categories.edit", category.slug)}
                  >
                    Edit
                  </Link>
                  <Link
                    method="delete"
                    className="btn btn-sm btn-error btn-outline"
                    href={route("admin.categories.destroy", category.slug)}
                  >
                    Delete
                  </Link>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </AdminLayoutProvider>
  );
}
