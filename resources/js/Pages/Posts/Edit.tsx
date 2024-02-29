import { PostResponse } from "@/types/posts";
import { CategoryResponse } from "@/types/categories";
import BaseLayout from "@/Layouts/BaseLayout";

export default function Edit({
  post,
  categories,
}: {
  post: PostResponse;
  categories: CategoryResponse;
}) {
  console.log(post);
  return <BaseLayout></BaseLayout>;
}
