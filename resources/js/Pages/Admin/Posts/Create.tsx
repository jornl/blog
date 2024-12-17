import { CategoryResource } from "@/types/categories";
import { Head } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";

import { PostResource } from "@/types/posts";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import PostForm from "@/Pages/Admin/Posts/Partials/PostForm";

export default function Create({
  post,
  categories,
}: {
  post: PostResource;
  categories: CategoryResource[];
}) {
  return (
    <AdminLayoutProvider>
      <Head title="Create Post" />
      <div className="my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Create post</h1>
        <div className="">
          <PostForm
            post={post}
            categories={categories}
            category={post.category}
          >
            <button className="btn btn-outline btn-accent my-5 w-full">
              Create Post
            </button>
          </PostForm>
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
