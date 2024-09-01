import { PaginatedResponse } from "@/types";
import { CategoryResource } from "@/types/categories";

export default function Index({
  categories,
}: {
  categories: PaginatedResponse<CategoryResource>;
}) {
  console.log(categories);
  return <div></div>;
}
