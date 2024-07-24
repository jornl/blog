import { PostResponse } from "@/types/posts";
import { CommentResponse, Comment } from "@/types/comments";
import { PageProps, PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Pagination from "@/Components/Pagination";
import { formatDistanceToNow } from "date-fns";
import Header from "@/Components/Topography/Header";
import "remixicon/fonts/remixicon.css";
import Button from "@/Components/Buttons/Button";
import { FormEvent, useRef } from "react";
import MarkdownEditor, {
  EditorMethods,
} from "@/Components/Form/MarkdownEditor";

export default function Show({
  post,
  comments,
}: {
  post: PostResponse;
  comments: PaginatedResponse<CommentResponse>;
}) {
  const commentRef = useRef<null | HTMLDivElement>(null);
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

  return (
    <BaseLayout>
      <Head title={post.title} />
      <div className="container my-5 px-4">
        <Breadcrumbs />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
          <div className="md:col-span-2 order-2 md:order-1  lg:container-sm lg:mx-auto">
            <Header className="font-bold text-2xl flex justify-between items-center">
              {post.title}
            </Header>
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
              className="prose my-5 text-base-content"
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
            <h2 className="font-bold text-xl" ref={commentRef}>
              Comments ({comments.data.length})
            </h2>
            {user && (
              <div className="my-4">
                <MarkdownEditor
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
