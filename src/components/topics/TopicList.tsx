import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import { paths } from "@/utils/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div>
      <h2 className="mb-4">Topics</h2>
      <ul className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>
              <Chip color="warning" variant="shadow">
                {topic.slug}
              </Chip>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
