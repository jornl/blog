import { UserResponse } from "@/types/users";
import { PostResponse } from "@/types/posts";

export interface Comment {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  post_id: number;
}

export interface CommentResponse extends Comment {
  user: UserResponse;
  post: PostResponse;
}
