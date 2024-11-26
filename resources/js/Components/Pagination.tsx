import { PaginatedResponse } from "@/types";
import { cn } from "@/Utilities/utils";
import { Link } from "@inertiajs/react";

type PaginationType = {
  meta: PaginatedResponse<any>["meta"];
  className?: string;
};

export default function Pagination({ meta, className = "" }: PaginationType) {
  return (
    <div className="my-5 flex justify-end md:justify-between md:items-center px-4 md:px-0">
      <div className="hidden md:block">
        <p>
          Showing {meta.from} to {meta.to} of {meta.total} results
        </p>
      </div>
      <div className="pagination join">
        {meta.links.map((link) => (
          <Link
            key={link.label}
            className={cn(
              "join-item btn",
              {
                "btn-active": link.active,
                "btn-disabled": link.url === null,
              },
              className,
            )}
            href={route(route().current() ?? "", {
              ...route().params,
              page: link.url?.split("?page=")[1],
            })}
            preserveState
            title={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
