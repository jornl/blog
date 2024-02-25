import { PostResponse } from "@/types/posts";
import { PaginatedResponse } from "@/types";

export default function Index({
  posts,
}: {
  posts: PaginatedResponse<PostResponse>;
}) {
  console.log(posts);
  return <div></div>;
}
