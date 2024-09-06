import { type PostResource } from "@/types/posts";
import { type Comment, type CommentResource } from "@/types/comments";
import { type PageProps, type PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Pagination from "@/Components/Pagination";
import { formatDistanceToNow } from "date-fns";
import Header from "@/Components/Topography/Header";
import Comment from "@/Components/Comment";
import Button from "@/Components/Buttons/Button";
import { FormEvent, useRef } from "react";
import Editor, {
  EditorMethods,
} from "@/Components/MarkdownEditor/MarkdownEditor";
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.min.css";
import "remixicon/fonts/remixicon.css";
import "../../../css/editor.css";

export default function Show({
  post,
  comments,
}: {
  post: PostResource;
  comments: PaginatedResponse<CommentResource>;
}) {
  const commentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorMethods>(null);
  const form = useForm<Comment>();

  const { user } = usePage<PageProps>().props;

  const like = () => {
    form.post(route("likes.store", ["post", post.id]));
  };

  const unlike = () => {
    form.delete(route("likes.destroy", ["post", post.id]));
  };

  const comment = (e: FormEvent) => {
    e.preventDefault();

    form.post(route("posts.comments.store", post.id), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        if (editorRef.current) {
          editorRef.current.clearContent();
        }
      },
    });
  };

  const goToComments = () => {
    if (!commentRef.current) return;

    commentRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  document
    .querySelectorAll('pre code:not(code[data-highlighted="yes"]) ')
    .forEach((element) => {
      hljs.highlightElement(element as HTMLElement);
    });

  return (
    <BaseLayout>
      <Head title={post.title} />
      <div className="container my-5 px-4">
        <Breadcrumbs />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
          <Header className="font-bold text-3xl mb-5 md:col-span-3">
            {post.title}
          </Header>
          <div className="md:col-span-2">
            <div className="mb-10">
              {post.image && (
                <figure className="mb-5">
                  <img
                    className="w-full max-h-96 object-cover rounded-xl"
                    src={`/${post.image}`}
                    alt={`${post.title} image`}
                  />
                </figure>
              )}
              <p className="text-lg">{post.excerpt}</p>
            </div>
            <div className="py-8 px-12 rounded-xl lg:container-sm lg:mx-auto bg-base-200">
              <div
                className="prose md:w-[80ch] my-5 text-base-content md:mx-auto"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>

          <div className="card bg-base-200 p-5 my-5 md:my-0 self-start md:sticky md:top-10">
            <ul className="py-2">
              <li>
                {post.is_featured && (
                  <span className="font-semibold text-secondary">
                    Featured post
                  </span>
                )}
              </li>

              <li className="text-xs font-bold text-accent tracking-widest uppercase">
                {formatDistanceToNow(post.published_at ?? post.created_at, {
                  addSuffix: true,
                })}
              </li>

              <li>
                <div className="text-neutral-content tracking-wide mb-5 flex gap-5">
                  {user ? (
                    <>
                      {post.can.like ? (
                        <Button className="flex-1" onClick={like}>
                          {post.likes_count}{" "}
                          <i className="ri-thumb-up-line"></i>
                        </Button>
                      ) : (
                        <Button className="flex-1" onClick={unlike}>
                          {post.likes_count}{" "}
                          <i className="ri-thumb-down-line"></i>
                        </Button>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <Button className="flex-1" onClick={goToComments}>
                    {post.comments_count} <i className="ri-chat-1-line"></i>
                  </Button>
                </div>
              </li>
              <li>
                <span className="font-semibold">Category:</span>{" "}
                <Link
                  className="link-accent"
                  href={route("categories.show", post.category?.slug)}
                >
                  {post.category?.name}
                </Link>
              </li>
              <li>
                <span className="font-semibold">Author:</span>{" "}
                <Link className="link-accent" href={route("about")}>
                  {post.user?.name}
                </Link>
              </li>
            </ul>
          </div>

          <div className="comments my-5 md:col-span-2">
            <h2 className="font-bold text-xl" ref={commentRef}>
              Comments ({comments.data.length})
            </h2>
            {user && (
              <div className="my-4">
                <Editor
                  onChange={(e) => form.setData("body", e)}
                  className="min-h-[10rem] w-full"
                  placeholder="Write your comment here"
                  ref={editorRef}
                />
                <Button className="btn-accent btn-sm my-2" onClick={comment}>
                  Post
                </Button>
              </div>
            )}
            {comments.data.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <Pagination meta={comments.meta} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
