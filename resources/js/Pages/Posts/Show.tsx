import { PostResponse } from "@/types/posts";
import { CommentResponse } from "@/types/comments";
import { PaginatedResponse } from "@/types";

export default function Show({
  post,
  comments,
}: {
  post: PostResponse;
  comments: PaginatedResponse<CommentResponse>;
}) {
  console.log(post);
  return <div></div>;
}
