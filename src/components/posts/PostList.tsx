import type { PostWithDetails } from "@/db/queries/post";
import Link from "next/link";
import { paths } from "@/utils/paths";

interface PostListProps {
  fetchData: () => Promise<PostWithDetails[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map(post => {
    return (
      <li key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(post.topic.slug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </li>
    );
  });

  return <ul className="space-y-2 flex flex-col gap-2">{renderedPosts}</ul>;
}
