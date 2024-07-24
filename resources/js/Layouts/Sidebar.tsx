import { Accordion } from "@/Components/Accordion";
import "remixicon/fonts/remixicon.css";
import SidebarLink from "@/Components/Links/SidebarLink";

export default function Sidebar() {
  return (
    <nav
      className="flex flex-col gap-1 min-w-[220px] p-4"
      id="main-admin-navigation"
    >
      <div className="mb-2 p-4">
        <h2 className="text-2xl font-bold">JL Admin</h2>
      </div>
      <SidebarLink href={route("home")}>
        <i className="ri-home-2-line mr-3"></i>
        Homepage
      </SidebarLink>

      <SidebarLink href={route("dashboard")}>
        <i className="ri-dashboard-line mr-3"></i>
        Dashboard
      </SidebarLink>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            <i className="ri-article-line mr-3"></i>
            Posts
          </Accordion.Header>
          <Accordion.Content>
            <ul className="flex flex-col w-full gap-1">
              <li>
                <SidebarLink href={route("admin.posts.index")}>
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  All Posts
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href={route("admin.posts.create")}>
                  <i className="ri-quill-pen-fill mr-3"></i>
                  Create post
                </SidebarLink>
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
                <SidebarLink href={route("categories.index")}>
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  Categories
                </SidebarLink>
              </li>
              <li>
                <SidebarLink href={route("categories.create")}>
                  <i className="ri-quill-pen-fill mr-3"></i>
                  Create category
                </SidebarLink>
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
                <SidebarLink href={route("categories.index")}>
                  <i className="ri-layout-horizontal-line mr-3"></i>
                  Users
                </SidebarLink>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </nav>
  );
}
