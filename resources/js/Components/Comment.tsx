import { type Comment } from "@/types/comments";
import { formatDistanceToNow } from "date-fns";

export type CommentProps = {
  comment: Comment;
};

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="card my-5 bg-base-200">
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
          {formatDistanceToNow(comment.created_at, {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default Comment;
