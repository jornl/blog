import { PostResponse } from "@/types/posts";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { formatDistanceToNow } from "date-fns";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { cn } from "@/Utilities/utils";

export default function Index({
  posts,
}: {
  posts: PaginatedResponse<PostResponse>;
}) {
  return (
    <BaseLayout>
      <Head title="Posts" />
      <div className="container px-4 my-5">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <div className="posts md:grid md:grid-cols-3 md:gap-4 my-5 space-y-4">
          {posts.data.map((post, index) => (
            <div
              key={post.id}
              className={cn("card shadow-xl min-h-48 bg-base-200", {
                "col-span-3": index === 0,
              })}
            >
              {post.image && (
                <figure className="max-h-64">
                  <img
                    src={`/storage/${post.image}`}
                    alt={`${post.title} image`}
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="card-title flex items-start flex-col relative">
                  <div className="text-xs font-bold text-accent tracking-widest uppercase w-full flex mb-5">
                    <p className="">
                      {formatDistanceToNow(
                        post.published_at ?? post.created_at,
                        {
                          addSuffix: true,
                        },
                      )}
                    </p>
                    <p className="text-right">
                      <Link
                        href={route("categories.show", post.category.slug)}
                        className="hover:underline hover:text-secondary"
                      >
                        {post.category.name}
                      </Link>
                    </p>
                  </div>
                  <Link
                    href={post.routes.show}
                    className="hover:underline hover:text-primary"
                  >
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                  </Link>
                </div>

                <p
                  className="py-3 prose text-neutral-content"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt ?? post.body.substring(0, 200) + "...",
                  }}
                />
                <div className="card-actions">
                  <Link
                    href={post.routes.show}
                    className="btn btn-link btn-ghost"
                  >
                    Read more...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination meta={posts.meta} />
      </div>
    </BaseLayout>
  );
}
