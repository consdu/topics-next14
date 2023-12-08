import type { Post } from "@prisma/client";
import { db } from "@/db";

export type PostWithDetails = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export default function getPostsByTopicSlug(
  slug: string
): Promise<PostWithDetails[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });
}

export function getTopPosts(): Promise<PostWithDetails[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}

export function getPostsBySearchTerm(term: string): Promise<PostWithDetails[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [
        {
          title: {
            contains: term,
          },
        },
        {
          content: {
            contains: term,
          },
        },
      ],
    },
  });
}
