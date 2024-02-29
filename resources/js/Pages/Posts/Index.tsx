import { PostResponse } from "@/types/posts";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";

export default function Index({
  posts,
}: {
  posts: PaginatedResponse<PostResponse>;
}) {
  console.log(posts);
  return <BaseLayout></BaseLayout>;
}
