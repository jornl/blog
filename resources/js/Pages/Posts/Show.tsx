import { PostResponse } from "@/types/posts";
import { CommentResponse } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Pagination from "@/Components/Pagination";
import { formatDistanceToNow } from "date-fns";

export default function Show({
  post,
  comments,
}: {
  post: PostResponse;
  comments: PaginatedResponse<CommentResponse>;
}) {
  return (
    <BaseLayout>
      <Head title={post.title} />
      <div className="container my-5 px-4">
        <Breadcrumbs />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
          <div className="md:col-span-2 order-2 md:order-1">
            <h1 className="font-bold text-2xl flex justify-between items-center">
              {post.title}
              {/*{post.is_featured && (*/}
              {/*  <span className="bg-secondary text-secondary-content text-sm uppercase px-3 py-1 rounded-lg ml-3">*/}
              {/*    Featured*/}
              {/*  </span>*/}
              {/*)}*/}
            </h1>
            <p className="text-xs font-bold text-accent tracking-widest uppercase">
              {formatDistanceToNow(post.published_at ?? post.created_at, {
                addSuffix: true,
              })}
            </p>

            {post.image && (
              <figure className="my-5">
                <img
                  className="w-full max-h-96 object-cover"
                  src={`/storage/${post.image}`}
                  alt={`${post.title} image`}
                />
              </figure>
            )}

            <div
              className="prose my-5 text-neutral-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="card bg-base-200 p-5 order-1 md:order-2 my-5 md:my-0 self-start">
            <ul className="py-2">
              <li>
                {post.is_featured && (
                  <span className="font-semibold text-secondary">
                    Featured post
                  </span>
                )}
              </li>
              <li>
                <span className="font-semibold">Category:</span>{" "}
                <Link
                  className="link-accent"
                  href={route("categories.show", post.category.slug)}
                >
                  {post.category.name}
                </Link>
              </li>
              <li>
                <span className="font-semibold">Author:</span>{" "}
                <Link className="link-accent" href={route("about")}>
                  {post.user.name}
                </Link>
              </li>
            </ul>
          </div>
          <div className="comments my-5 order-3 md:col-span-3">
            <h2 className="font-bold text-xl">
              Comments ({comments.data.length})
            </h2>
            {comments.data.map((comment) => (
              <div key={comment.id} className="card my-5 bg-base-200">
                <div className="card-body">
                  <div className="font-bold">
                    <img
                      src={comment.user.gravatar}
                      alt={`${comment.user.name}'s Avatar`}
                      className="rounded-full w-8 h-8 mr-2 inline-block"
                    />
                    {comment.user.name}
                  </div>
                  <p>{comment.body}</p>

                  <p className="text-xs text-accent">
                    {formatDistanceToNow(comment.created_at, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
            <Pagination meta={comments.meta} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
