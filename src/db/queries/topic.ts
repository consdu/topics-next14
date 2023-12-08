import { db } from "@/db";

interface TopicsSlugs {
  slug: string;
}

export function getTopicSlugs(): Promise<TopicsSlugs[]> {
  return db.topic.findMany({
    select: {
      slug: true,
    },
  });
}
