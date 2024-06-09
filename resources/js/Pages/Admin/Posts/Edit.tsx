import { Post, PostResponse } from "@/types/posts";
import { CategoryResponse } from "@/types/categories";

import AdminLayout from "@/Layouts/AdminLayout";
import PostForm from "@/Pages/Admin/Posts/Partials/PostForm";

export default function Edit({
  post,
  categories,
}: {
  post: PostResponse;
  categories: CategoryResponse[];
}) {
  console.log(post);
  return (
    <AdminLayout>
      <div className="my-5 px-4">
        <PostForm
          categories={categories}
          category={post.category}
          post={post}
          context="update"
        />
      </div>
    </AdminLayout>
  );
}
