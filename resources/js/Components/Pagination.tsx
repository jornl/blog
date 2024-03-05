import { PaginatedResponse } from "@/types";
import { cn } from "@/Utilities/utils";
import { Link } from "@inertiajs/react";

type PaginationType = {
  meta: PaginatedResponse<any>["meta"];
  className?: string;
};

export default function Pagination({ meta, className = "" }: PaginationType) {
  return (
    <div className="my-5 flex justify-center md:justify-between md:items-center">
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
            href={link.url}
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
