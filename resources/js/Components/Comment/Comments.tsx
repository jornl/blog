import { mergeRefs } from "@/Utilities/utils";
import { forwardRef, Fragment, ReactNode, useRef } from "react";
import { CommentResource } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import Comment from "@/Components/Comment/Comment";
import Pagination from "@/Components/Pagination";

export type CommentsType = {
  children?: ReactNode;
  comments: PaginatedResponse<CommentResource>;
};

const Comments = forwardRef(({ comments, children }: CommentsType, ref) => {
  const localRef = useRef(null);
  const commentRef = mergeRefs([ref, localRef]);

  return (
    <div className="comments my-5 md:col-span-2">
      <h2 className="font-bold text-xl" ref={commentRef}>
        Comments ({comments.data.length})
      </h2>
      {children}
      {comments.data
        .filter((comment) => !comment.reply_id)
        .map((comment) => (
          <Fragment key={comment.id}>
            <Comment comment={comment} />

            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-4">
                {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} />
                ))}
              </div>
            )}
          </Fragment>
        ))}

      <Pagination meta={comments.meta} />
    </div>
  );
});

export default Comments;
