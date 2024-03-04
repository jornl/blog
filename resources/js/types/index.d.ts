import { UserResponse } from "@/types/users";

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  user: UserResponse | undefined;
};

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: [
      {
        url: string;
        label: string;
        active: boolean;
      },
    ];
  };
}
