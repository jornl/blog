import { PostResponse } from "@/types/posts";
import { CommentResponse } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";

export default function Show({
  post,
  comments,
}: {
  post: PostResponse;
  comments: PaginatedResponse<CommentResponse>;
}) {
  console.log(post);
  return <BaseLayout></BaseLayout>;
}
