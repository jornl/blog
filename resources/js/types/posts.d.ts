import { UserResource } from "@/types/users";
import { CommentResource } from "@/types/comments";
import { CategoryResource } from "@/types/categories";

export interface Post {
  id: number;
  title: string;
  excerpt?: string;
  body: string;
  html: string;
  image?: string;
  post_image?: File | null;
  published_at?: string;
  unpublished_at?: string;
  is_published: boolean;
  is_featured: boolean;
  category_id: number;
  created_at: string;
  updated_at: string;
  user_id?: number;
}

export interface PostResource extends Post {
  user?: UserResource;
  comments: CommentResource[];
  comments_count?: number;
  likes_count?: number;
  category: CategoryResource;
  routes: {
    show: string;
    edit?: string;
  };
  can: {
    like: boolean;
  };
}
