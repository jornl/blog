import { PaginatedResponse } from "@/types";
import { PostResource } from "@/types/posts";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";

import "remixicon/fonts/remixicon.css";
import Pagination from "@/Components/Pagination";

type IndexPageType = {
  posts: PaginatedResponse<PostResource>;
};

export default function Index({ posts }: IndexPageType) {
  return (
    <AdminLayout>
      <Head title="Administer Posts" />
      <div className="px-4 my-12">
        <header className="flex justify-between">
          <h1 className="text-3xl font-semibold">All posts</h1>
          <Link
            href={route("admin.posts.create")}
            className="btn btn-accent btn-outline"
          >
            <i className="ri-add-line mr-1"></i>New post
          </Link>
        </header>
        <div className="overflow-x-auto mt-5">
          <table className="table table-zebra">
            <thead className="text-lg">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created at</th>
                <th>Published at</th>
                <th>
                  <i className="ri-thumb-up-line"></i>
                </th>
                <th>
                  <i className="ri-chat-1-line"></i>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.data.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link
                      href={post.routes.show}
                      className="hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={route("admin.categories.show", post.category.slug)}
                      className="hover:text-primary"
                    >
                      {post.category.name}
                    </Link>
                  </td>
                  <td>
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {post.published_at
                      ? formatDistanceToNow(new Date(post.published_at), {
                          addSuffix: true,
                        })
                      : "Draft"}
                  </td>
                  <td>{post.likes_count}</td>
                  <td>{post.comments_count}</td>

                  <td className="text-right">
                    <Link href={post.routes.show}>
                      <button className="btn btn-ghost btn-sm hover:bg-primary hover:text-primary-content mr-3">
                        <i className="ri-eye-line"></i>
                      </button>
                    </Link>

                    <Link
                      href={post.routes.edit ?? ""}
                      className="btn btn-ghost btn-sm hover:bg-primary hover:text-primary-content mr-3"
                    >
                      <i className="ri-edit-line"></i>
                    </Link>
                    <button className="btn btn-ghost btn-sm hover:bg-error hover:text-error-content">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={posts.meta} />
        </div>
      </div>
    </AdminLayout>
  );
}
