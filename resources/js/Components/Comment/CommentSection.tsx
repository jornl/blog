import { mergeRefs } from "@/Utilities/utils";
import { forwardRef, ReactNode, useRef } from "react";
import { CommentResource } from "@/types/comments";
import { PaginatedResponse } from "@/types";
import Pagination from "@/Components/Pagination";
import Comments from "@/Components/Comment/Comments";
import Header from "@/Components/Topography/Header";

export type CommentsType = {
  children?: ReactNode;
  comments: PaginatedResponse<CommentResource>;
};

const CommentSection = forwardRef(
  ({ comments, children }: CommentsType, ref) => {
    const localRef = useRef(null);
    const commentRef = mergeRefs([ref, localRef]);

    return (
      <div className="comments my-5 md:col-span-2">
        <Header as="h2" className="font-bold text-xl" ref={commentRef}>
          Comments ({comments.data.length})
        </Header>
        {children}
        <Comments comments={comments.data} />

        <Pagination meta={comments.meta} />
      </div>
    );
  },
);

export default CommentSection;
