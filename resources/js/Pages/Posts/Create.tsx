import { CategoryResponse } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";

export default function Create({
  categories,
}: {
  categories: PaginatedResponse<CategoryResponse>;
}) {
  console.log(categories);
  return <BaseLayout></BaseLayout>;
}
