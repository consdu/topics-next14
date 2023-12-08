"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { errorMessages } from "@/utils/constants";
import { paths } from "@/utils/paths";

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    general?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes only",
    }),
  description: z.string().min(10),
});

export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if ((error as Error).message.includes("Unique")) {
      return {
        errors: {
          name: [errorMessages.topicExists],
        },
      };
    }

    if (error instanceof Error) {
      return {
        errors: {
          general: [error.message],
        },
      };
    }

    return {
      errors: {
        general: [errorMessages.generalError],
      },
    };
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
