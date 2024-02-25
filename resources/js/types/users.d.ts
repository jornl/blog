export interface User {
  id: number;
  name: string;
  email?: string;
  email_verified_at: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse extends User {}
