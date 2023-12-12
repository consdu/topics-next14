"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { errorMessages } from "@/utils/constants";
import { paths } from "@/utils/paths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    general?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  _formState: CreateCommentFormState,
  formData: FormData,
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
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

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          general: [err.message],
        },
      };
    }

    return {
      errors: {
        general: [errorMessages.generalError],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        general: [errorMessages.revalidateTopic],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  revalidatePath(paths.topicShow(topic.slug));

  return {
    errors: {},
    success: true,
  };
}
