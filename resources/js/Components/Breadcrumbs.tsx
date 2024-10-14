type BreadcrumbType = {
  label: string;
  url: string;
};
export default function Breadcrumbs() {
  const pathNames = window.location.pathname.split("/").filter((x) => x);

  // TODO: Implement breadcrumbs
  // const links = [
  //   { label: "Home", url: route("home") },
  //   ...(route().current("posts.index")
  //     ? [{ label: "Posts", url: route("posts.index") }]
  //     : []),
  //   ...(route().current("posts.show")
  //     ? [
  //         {
  //           label: "Posts",
  //           url: route("posts.index"),
  //         },
  //         {
  //           label: "Current Post",
  //           url: route("posts.show", route().params),
  //         },
  //       ]
  //     : []),
  //   ...(route().current("posts.create")
  //     ? [{ label: "Create Post", url: route("posts.create") }]
  //     : []),
  // ];
  const links: BreadcrumbType[] = [
    { label: "Home", url: route("home") },
    ...pathNames.map((value, index) => {
      const url = `/${pathNames.slice(0, index + 1).join("/")}`;
      return { label: value.charAt(0).toUpperCase() + value.slice(1), url };
    }),
  ];

  return (
    <div className="breadcrumbs text-sm my-5">
      <ul>
        {links.map((link, index) => (
          <li key={link.url}>
            {index !== links.length - 1 ? (
              <a href={link.url}>{link.label}</a>
            ) : (
              <span>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
