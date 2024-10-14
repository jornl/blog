import AdminLayout from "@/Layouts/AdminLayout";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Header from "@/Components/Topography/Header";
import FormInput from "@/Components/Form/FormInput";
import Button from "@/Components/Buttons/Button";
import { Category } from "@/types/categories";
import { useForm } from "@inertiajs/react";

type EditType = {
  category: Category;
};

export default function Edit({ category }: EditType) {
  const { data, setData, put } = useForm<Category>({
    name: category.name,
  });

  const updateCategory = (e) => {
    e.preventDefault();
    put(route("admin.categories.update", category.slug));
  };

  return (
    <AdminLayout>
      <div className="my-5 px-4">
        <Breadcrumbs />
        <Header>Edit Category: {category.name}</Header>
        <form className="my-5" onSubmit={updateCategory}>
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
              Update Category
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
