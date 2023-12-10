import { Suspense } from "react";
import Link from "next/link";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import PostShow from "@/components/posts/PostShow";
import PostShowLoading from "@/components/posts/PostShowLoading";
import { paths } from "@/utils/paths";

interface PostShowPageProps {
  params: {
    postId: string;
    slug: string;
  };
}

export default function PostShowPage({
  params: { postId, slug },
}: PostShowPageProps) {
  return (
    <div className="space-y-3 pb-20">
      <Link
        className="mb-10 block underline decoration-solid"
        href={paths.topicShow(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentList postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
    </div>
  );
}
