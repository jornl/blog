import { Post, PostResponse } from "@/types/posts";
import { CategoryResponse } from "@/types/categories";

import AdminLayout from "@/Layouts/AdminLayout";
import PostForm from "@/Pages/Admin/Posts/Partials/PostForm";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit(
  {
    post,
    categories,
  }: {
    post: PostResponse;
    categories: CategoryResponse[];
  }) {
  const { patch: save, setData, errors, reset } = useForm<Post>(post);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    save(route("admin.posts.update", post));
    console.log("submitting");
  };

  return (
    <AdminLayout>
      <div className="my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Update: {post.title}</h1>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="form my-5 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <PostForm
            setData={setData}
            errors={errors}
            categories={categories}
            category={post.category}
            post={post}
          />
          <button className="btn btn-outline btn-accent my-5 w-full">
            Update Post
          </button>

          <button
            className="btn btn-outline btn-neutral w-full"
            onClick={() => reset()}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
