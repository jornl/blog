import Breadcrumbs from "@/Components/Breadcrumbs";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Header from "@/Components/Topography/Header";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";
import { FormEvent } from "react";

export default function Create() {
  const { data, setData, post } = useForm({
    name: "",
  });

  const createCategory = (e: FormEvent) => {
    e.preventDefault();
    post(route("admin.categories.store"));
  };

  return (
    <AdminLayoutProvider>
      <Head title={"Create Category"} />
      <div className="my-5 px-4">
        <Breadcrumbs />
        <Header>Create Category</Header>
        <form onSubmit={createCategory} className="my-5">
          <div className="my-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category name</span>
              </div>
              <FormInput
                name="name"
                id="name"
                placeholder="Category name"
                onChange={(e) => setData("name", e.target.value)}
                value={data.name ?? ""}
              />
            </label>
          </div>

          <div className="my-5">
            <Button type="submit" className="btn-accent btn-outline">
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </AdminLayoutProvider>
  );
}
