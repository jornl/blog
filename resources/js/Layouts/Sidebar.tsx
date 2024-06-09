import { Link } from "@inertiajs/react";
import { Accordion } from "@/Components/Accordion";
import "remixicon/fonts/remixicon.css";

export default function Sidebar() {
  return (
    <nav
      className="flex flex-col gap-1 min-w-[220px] p-4"
      id="main-admin-navigation"
    >
      <div className="mb-2 p-4">
        <h2 className="text-2xl font-bold">JL Admin</h2>
      </div>
      <Link
        href={route("home")}
        className="px-4 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
      >
        <i className="ri-home-2-line mr-3"></i>
        Homepage
      </Link>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            <i className="ri-article-line mr-3"></i>
            Posts
          </Accordion.Header>
          <Accordion.Content>
            <ul className="flex flex-col w-full gap-1">
              <li>
                <Link
                  href={route("admin.posts.index")}
                  className="block px-5 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
                >
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href={route("admin.posts.create")}
                  className="block px-5 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
                >
                  <i className="ri-quill-pen-fill mr-3"></i>
                  Create post
                </Link>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <i className="ri-folder-line mr-3"></i>
            Categories
          </Accordion.Header>
          <Accordion.Content>
            <ul className="flex flex-col w-full gap-1">
              <li>
                <Link
                  href={route("categories.index")}
                  className="block px-5 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
                >
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href={route("categories.create")}
                  className="block px-5 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
                >
                  <i className="ri-quill-pen-fill mr-3"></i>
                  Create category
                </Link>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <i className="ri-shield-user-line mr-3"></i>
            Users
          </Accordion.Header>
          <Accordion.Content>
            <ul>
              <li>
                <Link
                  href={route("categories.index")}
                  className="block px-5 py-3 hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200"
                >
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  Users
                </Link>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </nav>
  );
}
