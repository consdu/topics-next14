import { Divider } from "@nextui-org/react";
import PostList from "@/components/posts/PostList";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";
import { getTopPosts } from "@/db/queries/post";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <section className="col-span-3">
        <h1 className="text-xl mb-4">Top posts</h1>
        <div className="px-2">
          <PostList fetchData={getTopPosts} />
        </div>
      </section>
      <aside className="flex flex-col gap-8">
        <TopicCreateForm />
        <Divider />
        <TopicList />
      </aside>
    </div>
  );
}
