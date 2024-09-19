import { type CommentResource } from "@/types/comments";
import { cn } from "@/Utilities/utils";
import { formatDistanceToNow } from "date-fns";

export type CommentsProps = {
  comment: CommentResource;
  className?: string;
};

const Comment = ({ comment, className }: CommentsProps) => {
  return (
    <div
      className={cn(
        "card my-5 bg-base-200 rounded-none md:rounded-xl",
        className,
      )}
    >
      <div className="card-body">
        <div className="font-bold">
          <img
            src={comment.user.gravatar}
            alt={`${comment.user.name}'s Avatar`}
            className="rounded-full w-8 h-8 mr-2 inline-block"
          />
          {comment.user.name}
        </div>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: comment.html }}
        />

        <p className="text-xs text-accent">
          {formatDistanceToNow(new Date(comment.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default Comment;
