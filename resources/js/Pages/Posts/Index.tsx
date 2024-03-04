import { PostResponse } from "@/types/posts";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { formatDistanceToNow } from "date-fns";

export default function Index({
  posts,
}: {
  posts: PaginatedResponse<PostResponse>;
}) {
  console.log(posts);
  return (
    <BaseLayout>
      <Head title="Posts" />
      <div className="container px-4 my-5">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="posts md:grid md:grid-cols-3 md:gap-4 mt-5 space-y-4">
          {posts.data.map((post, index) => (
            <div
              key={post.id}
              className={`card shadow-xl min-h-48 bg-base-200 ${index === 0 && "col-span-3"}`}
            >
              {post.image && (
                <figure>
                  <img src={post.image} alt={`${post.title} image`} />
                </figure>
              )}
              <div className="card-body">
                <div className="card-title flex items-start flex-col">
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

                <p className="py-3">{`${post.body.substring(0, 200)}...`}</p>
                <div className="card-actions">
                  <Link
                    href={post.routes.show}
                    className="hover:underline hover:text-primary"
                  >
                    Read more...
                  </Link>
                </div>
                <div className="p-4 bg-base-100 rounded-lg mt-5">
                  <span className="text-sm text-accent flex gap-4 items-center">
                    <img
                      src={post.user.gravatar}
                      alt={`${post.user.name}s gravatar`}
                      className="rounded-full w-8 h-8"
                    />{" "}
                    {post.user.name}
                  </span>
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
