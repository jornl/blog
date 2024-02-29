import { InertiaLinkProps, Link } from "@inertiajs/react";
import { cn } from "@/Utilities/utils";

export type NavLinkType = InertiaLinkProps & { active: boolean };

export default function NavLink({
  href,
  active,
  className,
  children,
  ...rest
}: NavLinkType) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-3 py-3 border-b-2 rounded-none text-sm leading-5 focus:outline-none",
        {
          "border-indigo-400 focus:border-indigo-700 font-semibold": active,
          "border-transparent hover:border-gray-300 focus:border-gray-300":
            !active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
