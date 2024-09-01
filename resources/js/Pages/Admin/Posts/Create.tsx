import { CategoryResource } from "@/types/categories";
import { Head, useForm } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { FormEvent } from "react";

import { PostResource } from "@/types/posts";
import AdminLayout from "@/Layouts/AdminLayout";
import PostForm from "@/Pages/Admin/Posts/Partials/PostForm";

export default function Create({
  post,
  categories,
}: {
  post: PostResource;
  categories: CategoryResource[];
}) {
  const {
    post: save,
    data,
    setData,
    errors,
    reset,
  } = useForm<PostResource>(post);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    save(route("admin.posts.store"));
  };

  return (
    <AdminLayout>
      <Head title="Create Post" />
      <div className="my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Create post</h1>
        <div className="">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="form my-5 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <PostForm
              setData={setData}
              errors={errors}
              data={data}
              post={post}
              categories={categories}
              category={post.category}
            >
              <button className="btn btn-outline btn-accent my-5 w-full">
                Create Post
              </button>

              <button
                className="btn btn-outline btn-neutral w-full"
                onClick={() => reset()}
                type="button"
              >
                Cancel
              </button>
            </PostForm>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
