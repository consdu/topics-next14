import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import getPostsByTopicSlug from "@/db/queries/post";
// import { getTopicSlugs } from "@/db/queries/topic";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="mb-2 text-2xl font-bold">{slug}</h1>
        <div className="pr-20 pt-6">
          <PostList fetchData={() => getPostsByTopicSlug(slug)} />
        </div>
      </div>
      <div className="flex flex-col">
        <PostCreateForm topicSlug={slug} />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   const topics = await getTopicSlugs();

//   return topics.map((topic) => ({
//     slug: topic.slug,
//   }));
// }
