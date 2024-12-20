import { type PostResource } from "@/types/posts";
import { type CommentResource, type CommentType } from "@/types/comments";
import { type PageProps, type PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { formatDistanceToNow } from "date-fns";
import Header from "@/Components/Topography/Header";
import Button from "@/Components/Buttons/Button";
import { FormEvent, useEffect, useRef } from "react";
import Editor, {
  EditorMethods,
} from "@/Components/MarkdownEditor/MarkdownEditor";
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.min.css";
import "remixicon/fonts/remixicon.css";
import "../../../css/editor.css";
import CommentSection from "@/Components/Comment/CommentSection";

type ShowPageType = {
  post: PostResource;
  relatedPosts: PostResource[];
  comments: PaginatedResponse<CommentResource>;
  preview?: boolean;
};

export default function Show({
  post,
  relatedPosts,
  comments,
  preview,
}: ShowPageType) {
  const commentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorMethods>(null);
  const form = useForm<CommentType>();

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

  useEffect(() => {
    document
      .querySelectorAll('pre code:not(code[data-highlighted="yes"]) ')
      .forEach((element) => {
        hljs.highlightElement(element as HTMLElement);
      });
  }, []);

  return (
    <BaseLayout>
      <Head title={post.title} />
      <div className="container my-5 md:px-4">
        <Breadcrumbs />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
          <Header className="font-bold text-3xl mb-5 md:col-span-3">
            {post.title}
            <p className="text-xs font-bold text-accent tracking-widest uppercase mt-1.5">
              Posted{" "}
              {formatDistanceToNow(post.published_at ?? post.created_at, {
                addSuffix: true,
              })}
            </p>
          </Header>
          <div className="md:col-span-2">
            {(post.image || post.excerpt) && (
              <div className="mb-10">
                {post.image && (
                  <figure className="mb-5">
                    <img
                      className="w-full max-h-96 object-cover md:rounded-xl"
                      src={`${post.image}`}
                      alt={`${post.title} image`}
                    />
                  </figure>
                )}
                <p className="text-lg">{post.excerpt}</p>
              </div>
            )}
            <div className="py-8 px-12 md:rounded-xl lg:container-sm lg:mx-auto bg-base-200">
              <div
                className="prose md:w-[80ch] my-5 text-base-content md:mx-auto"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>

          <div className="card bg-base-200 p-5 my-5 md:my-0 self-start md:sticky md:top-10">
            <div className="w-full text-center">
              <figure className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                <img
                  src={post.user?.gravatar}
                  alt={post.user?.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <p className="text-lg font-bold mt-5">
                <Link
                  className="text-base-content hover:link-accent"
                  href={route("about")}
                  title="About the author"
                >
                  {post.user?.name}
                </Link>
              </p>
            </div>

            <ul className="py-2">
              <li>
                <div className="text-neutral-content tracking-wide mb-5 flex gap-5">
                  {user && preview !== true ? (
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
                    <Button disabled={true} className="flex-1">
                      {post.likes_count} <i className="ri-thumb-up-line"></i>
                    </Button>
                  )}
                  <Button className="flex-1" onClick={goToComments}>
                    <span className="sr-only">Comments</span>
                    {post.comments_count} <i className="ri-chat-1-line"></i>
                  </Button>
                </div>
              </li>
            </ul>
            <div className="my-8">
              <p className="text-lg">
                <strong>Other posts in </strong>
                <Link
                  className="font-bold text-secondary hover:text-accent"
                  href={route("categories.show", post.category?.slug)}
                >
                  {post.category.name}
                </Link>
              </p>
              <ul>
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.id} className="font-sm py-1.5">
                    <Link
                      href={relatedPost.routes.show}
                      className="hover:text-accent"
                    >
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {preview !== true && (
            <CommentSection comments={comments} ref={commentRef}>
              {user && (
                <div className="my-4 px-4 md:px-0">
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
            </CommentSection>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
