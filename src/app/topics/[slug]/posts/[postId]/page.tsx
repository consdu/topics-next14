import Link from "next/link";
import PostShow from "@/components/posts/PostShow";
import { paths } from "@/utils/paths";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/PostShowLoading";

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
        className="underline decoration-solid block mb-10"
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
