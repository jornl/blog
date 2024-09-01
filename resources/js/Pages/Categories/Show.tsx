import { CategoryResource } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import { PostResource } from "@/types/posts";

export default function Show({
  category,
  posts,
}: {
  category: CategoryResource;
  posts: PaginatedResponse<PostResource>;
}) {
  console.log(category);
  console.log(posts);
  return <div></div>;
}
