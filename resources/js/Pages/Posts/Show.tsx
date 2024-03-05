import { PostResponse } from "@/types/posts";
import { CommentResponse } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head } from "@inertiajs/react";
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
        <h1 className="font-bold text-2xl flex justify-between items-center">
          {post.title}
          {post.is_featured && (
            <span className="bg-secondary text-secondary-content text-sm uppercase px-3 py-1 rounded-lg ml-3">
              Featured
            </span>
          )}
        </h1>
        <p className="text-xs font-bold text-accent tracking-widest uppercase">
          {formatDistanceToNow(post.published_at ?? post.created_at, {
            addSuffix: true,
          })}
        </p>
        <div
          className="prose my-5 max-w-none text-neutral-content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <div className="comments my-5">
          <h2 className="font-bold text-xl">
            Comments ({comments.data.length})
          </h2>
          {comments.data.map((comment) => (
            <div key={comment.id} className="card my-5 bg-base-200">
              <div className="card-body">
                <div className="font-bold">{comment.user.name}</div>
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
          <Pagination meta={comments.meta} />
        </div>
      </div>
    </BaseLayout>
  );
}
