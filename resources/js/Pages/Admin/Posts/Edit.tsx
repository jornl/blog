import { PostResource } from "@/types/posts";
import { CategoryResource } from "@/types/categories";

import { AdminLayoutProvider } from "@/Layouts/AdminLayout";
import PostForm from "@/Pages/Admin/Posts/Partials/PostForm";
import Breadcrumbs from "@/Components/Breadcrumbs";

export default function Edit({
  post,
  categories,
}: {
  post: PostResource;
  categories: CategoryResource[];
}) {
  return (
    <AdminLayoutProvider>
      <div className="my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Update: {post.title}</h1>

        <PostForm categories={categories} category={post.category} post={post}>
          <button className="btn btn-outline btn-accent my-5 w-full">
            Update Post
          </button>
        </PostForm>
      </div>
    </AdminLayoutProvider>
  );
}
