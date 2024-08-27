import { router } from "@inertiajs/react";

export const sort = (column: string) => {
  const queryParams = new URLSearchParams(location.search);
  const sortParams = queryParams.get("sort")?.split(",") || [];

  const fieldIndex = sortParams.findIndex(
    (param) => param.replace("-", "") === column,
  );

  if (fieldIndex >= 0) {
    const currentField = sortParams[fieldIndex];
    currentField.startsWith("-")
      ? sortParams.splice(fieldIndex, 1)
      : (sortParams[fieldIndex] = `-${column}`);
  } else {
    sortParams.push(column);
  }

  sortParams.length > 0
    ? queryParams.set("sort", sortParams.join(","))
    : queryParams.delete("sort");

  router.get(
    location.pathname + "?" + queryParams.toString(),
    {},
    {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    },
  );
};
