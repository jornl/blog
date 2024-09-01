import { CategoryResource } from "@/types/categories";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

type ShowPageType = {
  category: CategoryResource;
};

export default function Show({ category }: ShowPageType) {
  return (
    <AdminLayout>
      <Head title="Administer Categories" />
    </AdminLayout>
  );
}
