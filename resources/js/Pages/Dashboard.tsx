import { Head, Link } from "@inertiajs/react";
import { CategoryResource } from "@/types/categories";
import { PostResource } from "@/types/posts";
import { CommentResource } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { formatDistanceToNow } from "date-fns";
import { AdminLayoutProvider } from "@/Layouts/AdminLayout";

import "remixicon/fonts/remixicon.css";

type DashboardPageType = {
  categories: CategoryResource[];
  posts: PaginatedResponse<PostResource>;
  comments: PaginatedResponse<CommentResource>;
};

export default function Dashboard({
  categories,
  posts,
  comments,
}: DashboardPageType) {
  return (
    <AdminLayoutProvider>
      <Head title="Dashboard" />

      <div className="px-4 my-5">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div className="md:col-span-2">
            <h2 className="font-semibold text-xl">Popular posts</h2>
            {posts.data.map((post) => (
              <div className="card bg-base-200 p-5 my-3" key={post.id}>
                <div className="flex justify-between flex-wrap">
                  <p className="text-primary order-2">{post.category.name}</p>
                  <Link
                    href={post.routes.show}
                    className="hover:underline hover:text-primary"
                  >
                    <h3 className="text-lg">{post.title}</h3>
                  </Link>
                </div>
                <p className="text-xs font-bold text-accent tracking-widest uppercase">
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                </p>

                <div className="flex mt-3">
                  <p
                    className="mr-7"
                    title={`Latest comment ${formatDistanceToNow(new Date(post.comments[post.comments.length - 1].created_at), { addSuffix: true })}`}
                  >
                    <i className="ri-chat-1-fill mr-2"></i>
                    {post.comments_count}
                  </p>
                  <p>
                    <i className="ri-thumb-up-fill mr-2"></i>
                    {post.likes_count}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-semibold text-xl">Latest comments</h2>
            {comments.data.map((comment) => (
              <div className="card bg-base-200 my-3" key={comment.id}>
                <div className="flex justify-between">
                  <div className="flex-1 p-5">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="my-3">{comment.body}</p>
                    <p className="text-xs font-bold text-accent tracking-widest uppercase">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <Link
                    href={comment.post.routes.show}
                    className="bg-base-300 px-3 flex rounded-r-xl text-xl"
                    title="Go to post"
                  >
                    <i className="ri-arrow-right-circle-fill self-center"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
