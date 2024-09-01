import { PostResource } from "@/types/posts";
import { PaginatedResponse } from "@/types/index";

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResource extends Category {
  posts?: PaginatedResponse<PostResource>;
  post_count?: number;
}
