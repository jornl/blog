import { CategoryResource } from "@/types/categories";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

type ShowPageType = {
  category: CategoryResource;
};

export default function Show({ category }: ShowPageType) {
  return (
    <AdminLayoutProvider>
      <Head title="Administer Categories" />
    </AdminLayoutProvider>
  );
}
