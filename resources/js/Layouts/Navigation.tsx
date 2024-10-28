import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import NavLink from "@/Components/Links/NavLink";

export default function Navigation() {
  const user = usePage<PageProps>().props.user;

  const links = [
    {
      name: "Home",
      url: route("home"),
      route: "home",
      when: () => true,
    },
    {
      name: "Dashboard",
      url: route("dashboard"),
      route: "dashboard",
      when: () => user?.is_admin,
    },
    {
      name: "Posts",
      url: route("posts.index"),
      route: "posts.*",
      when: () => true,
    },
    {
      name: "About me",
      url: route("about"),
      route: "about",
      when: () => true,
    },
  ];

  return (
    <nav className="navbar p-0 px-4 md:px-0 container">
      <div className="navbar-start min-h-full">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          >
            {links.map(
              (link) =>
                link.when() && (
                  <li key={link.name}>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ),
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl">JL</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu p-0 menu-horizontal px-1 space-x-2">
          {links.map(
            (link) =>
              link.when() && (
                <li key={link.name}>
                  <NavLink href={link.url} active={route().current(link.route)}>
                    {link.name}
                  </NavLink>
                </li>
              ),
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user !== null ? (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Users Avatar" src={user?.gravatar} />
              </div>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
            >
              <li>
                <Link href={route("profile.edit")} className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <Link href={route("logout")} method="post" as="button">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <NavLink href={route("login")} active={route().current("login")}>
              Login
            </NavLink>
            <NavLink
              href={route("register")}
              active={route().current("register")}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
