import { type CommentResource, CommentType } from "@/types/comments";
import { cn } from "@/Utilities/utils";
import Button from "@/Components/Buttons/Button";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import MarkdownEditor from "@/Components/MarkdownEditor/MarkdownEditor";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export type CommentsProps = {
  comment: CommentResource;
  className?: string;
};

const Comment = ({ comment, className }: CommentsProps) => {
  const [showReply, setShowReply] = useState(false);

  const { setData, post, delete: destroy } = useForm<CommentType>();

  const { user } = usePage<PageProps>().props;

  const like = () => {
    post(route("likes.store", ["comment", comment.id]), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const unlike = () => {
    destroy(route("likes.destroy", ["comment", comment.id]), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const reply = () => {
    post(route("posts.comments.store", comment.post_id), {
      onSuccess: () => {
        setData("body", "");
        setShowReply(false);
      },
      onError: (err) => {
        console.log("error", err);
      },
    });
  };

  return (
    <div
      className={cn(
        "card my-5 bg-base-200 rounded-none md:rounded-xl",
        className,
      )}
    >
      <div className="card-body">
        <div className="font-bold flex">
          <img
            src={comment.user.gravatar}
            alt={`${comment.user.name}'s Avatar`}
            className="rounded-full w-8 h-8 mr-3 inline-block"
          />
          <div className="flex flex-col">
            <p>{comment.user.name}</p>

            <p className="text-xs text-accent font-normal">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: comment.html }}
        />

        {user && (
          <>
            <div className="mt-5 space-x-5">
              {comment.can.like ? (
                <Button
                  className="btn-secondary btn-sm btn-outline"
                  onClick={like}
                >
                  {comment.likes_count} <i className="ri-thumb-up-line"></i>
                </Button>
              ) : (
                <Button className="btn-secondary btn-sm" onClick={unlike}>
                  {comment.likes_count} <i className="ri-thumb-down-line"></i>
                </Button>
              )}
              <Button
                className="btn-accent btn-sm btn-outline"
                onClick={() => {
                  setData("reply_id", comment.id);
                  setShowReply((prev) => !prev);
                }}
              >
                {comment.replies_count ?? 0} <i className="ri-reply-line"></i>
              </Button>
            </div>

            {showReply && (
              <div className="mt-5">
                <MarkdownEditor
                  placeholder={`Replying to ${comment.user.name}`}
                  onChange={(e) => setData("body", e)}
                  className="min-h-[8rem]"
                />
                <Button className="btn-primary btn-sm" onClick={reply}>
                  Comment
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
