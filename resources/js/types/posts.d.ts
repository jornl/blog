import { UserResponse } from "@/types/users";
import { PaginatedResponse } from "@/types/index";
import { CommentResponse } from "@/types/comments";
import { CategoryResponse } from "@/types/categories";

export interface Post {
  id: number;
  title: string;
  excerpt?: string;
  body: string;
  image?: string;
  published_at?: string;
  is_published: boolean;
  category_id: number;
  created_at: string;
  updated_at: string;
  user_id?: number;
}

export interface PostResponse extends Post {
  user?: UserResponse;
  comments?: PaginatedResponse<CommentResponse>;
  category?: CategoryResponse;
}
