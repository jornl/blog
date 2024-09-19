import { Fragment, ReactNode } from "react";
import { CommentResource } from "@/types/comments";
import Comment from "@/Components/Comment/Comment";
import { cn } from "@/Utilities/utils";

type CommentsProps = {
  comments: CommentResource[];
  className?: string;
  children?: ReactNode;
};

const Comments = ({ comments, className, children }: CommentsProps) => {
  const topComments = comments.filter((comment) => !comment.reply_id);

  const renderComments = (comments: CommentResource[]) => {
    return comments.map((comment) => (
      <Fragment key={comment.id}>
        <Comment
          comment={comment}
          className={cn(
            "",
            { "rounded-l-xl": comment.reply_id !== null },
            className,
          )}
        />
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-3 md:ml-8">{renderComments(comment.replies)}</div>
        )}
      </Fragment>
    ));
  };
  return (
    <>
      {children}
      {renderComments(topComments)}
    </>
  );
};

export default Comments;
