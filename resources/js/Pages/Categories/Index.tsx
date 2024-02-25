import { PaginatedResponse } from "@/types";
import { CategoryResponse } from "@/types/categories";

export default function Index({
  categories,
}: {
  categories: PaginatedResponse<CategoryResponse>;
}) {
  console.log(categories);
  return <div></div>;
}
