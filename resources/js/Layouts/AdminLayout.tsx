import { ReactNode, useState } from "react";
import Sidebar from "@/Layouts/Sidebar";

type AdminLayoutProps = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className="fixed flex flex-col top-0 h-[calc(100vh-2rem)] w-full max-w-[16rem] bg-base-300 p-4 shadow-xl">
        <Sidebar />
        {/*<Navigation />*/}
      </div>
      <main className="md:pl-[18rem] md:pr-8">{children}</main>
      <footer></footer>
    </>
  );
}
