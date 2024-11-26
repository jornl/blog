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
    <Link href={href} className={cn(className)} {...rest}>
      {children}
    </Link>
  );
}
