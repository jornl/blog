import { UserResource } from "@/types/users";
import { PostResource } from "@/types/posts";

export interface Comment {
  id: number;
  body: string;
  html: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  post_id: number;
}

export interface CommentResource extends Comment {
  user: UserResource;
  post: PostResource;
  replies?: CommentResource[];
}
