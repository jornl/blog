import { UserResponse } from "@/types/users";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

type IndexPageProps = {
  users: UserResponse[]
}

const Index = ({ users }) => {
  console.log(users);
  return <AdminLayout>
    <Head title="Users" />
  </AdminLayout>;
};

export default Index;

