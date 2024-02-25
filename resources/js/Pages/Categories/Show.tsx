import { CategoryResponse } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import { PostResponse } from "@/types/posts";

export default function Show({
  category,
  posts,
}: {
  category: CategoryResponse;
  posts: PaginatedResponse<PostResponse>;
}) {
  console.log(category);
  console.log(posts);
  return <div></div>;
}
