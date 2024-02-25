import { CategoryResponse } from "@/types/categories";
import { PaginatedResponse } from "@/types";

export default function Create({
  categories,
}: {
  categories: PaginatedResponse<CategoryResponse>;
}) {
  console.log(categories);
  return <div></div>;
}
