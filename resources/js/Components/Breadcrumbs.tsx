type BreadcrumbType = {};

export default function Breadcrumbs() {
  // TODO: Implement breadcrumbs
  const links = [
    { label: "Home", url: route("home") },
    ...(route().current("posts.index")
      ? [{ label: "Posts", url: route("posts.index") }]
      : []),
    ...(route().current("posts.show")
      ? [
          {
            label: "Posts",
            url: route("posts.index"),
          },
          {
            label: "Current Post",
            url: route("posts.show", route().params),
          },
        ]
      : []),
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
