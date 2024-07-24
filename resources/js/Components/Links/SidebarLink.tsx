import { InertiaLinkProps, Link } from "@inertiajs/react";
import { cn } from "@/Utilities/utils";

const SidebarLink = ({
  href,
  className,
  children,
  ...props
}: InertiaLinkProps) => {
  return (
    <Link
      className={cn(
        "block px-4 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
