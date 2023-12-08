import { redirect } from "next/navigation";
import { db } from "@/db";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({
  postId,
}: PostShowProps): Promise<React.ReactElement> {
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return redirect("/");
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
