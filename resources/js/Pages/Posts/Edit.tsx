import { PostResponse } from "@/types/posts";
import { CategoryResponse } from "@/types/categories";

export default function Edit({
  post,
  categories,
}: {
  post: PostResponse;
  categories: CategoryResponse;
}) {
  console.log(post);
  return <div></div>;
}
