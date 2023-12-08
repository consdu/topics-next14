import CommentShow from "@/components/comments/CommentShow";
import getCommentsByPostId from "@/db/queries/comment";

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await getCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    comment => comment.parentId === null
  );

  const renderedComments = topLevelComments.map(comment => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        authorName={comment.user.name!}
        postId={postId}
      />
    );
  });

  return (
    <div className="py-10">
      <h1 className="mb-4 text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
