import { UserResource } from "@/types/users";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Table } from "@/Components/Table";
import { PaginatedResponse } from "@/types";

type IndexPageProps = {
  users: PaginatedResponse<UserResource>;
};

const Index = ({ users }: IndexPageProps) => {
  console.log(users);
  return (
    <AdminLayoutProvider>
      <Head title="Users" />
      <Table zebra={true}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.data.map((user) => (
            <Table.Row key={user.id}>
              <Table.DataCell>{user.name}</Table.DataCell>
              <Table.DataCell>{user.email}</Table.DataCell>
              <Table.DataCell>
                <a href="#">Edit</a>
                <a href="#">Delete</a>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AdminLayoutProvider>
  );
};

export default Index;
