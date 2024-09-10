import { UserResource } from "@/types/users";
import { PostResource } from "@/types/posts";

export interface CommentType {
  id: number;
  body: string;
  html: string;
  replies_count?: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  post_id: number;
  reply_id?: number;
}

export interface CommentResource extends CommentType {
  user: UserResource;
  post: PostResource;
  replies?: CommentResource[];
}
