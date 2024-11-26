import Navigation from "@/Layouts/Navigation";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer className="py-12"></footer>
    </>
  );
}
