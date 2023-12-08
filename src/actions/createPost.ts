"use server";

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { errorMessages } from "@/utils/constants";
import { paths } from "@/utils/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    general?: string[];
  };
}

export async function createPost(
  topicSlug: string,
  _formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        general: [errorMessages.notSignedIn],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug: topicSlug },
  });

  if (!topic) {
    return {
      errors: {
        general: [errorMessages.notFoundTopic],
      },
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          general: [error.message],
        },
      };
    }

    return {
      errors: {
        general: [errorMessages.createPost],
      },
    };
  }

  revalidatePath(paths.topicShow(topicSlug));
  redirect(paths.postShow(topicSlug, post.id));
}
