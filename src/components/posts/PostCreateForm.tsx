"use client";

import { useFormState } from "react-dom";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import SubmitButton from "@/components/shared/SubmitButton";

interface PostCreateFormProps {
  topicSlug: string;
}
export default function PostCreateForm({ topicSlug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, topicSlug),
    {
      errors: {},
    },
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex w-80 flex-col gap-4 p-4">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              errorMessage={formState.errors.title?.join(", ")}
              isInvalid={!!formState.errors.title}
              label="Title"
              labelPlacement="outside"
              name="title"
              placeholder="Title"
            />
            <Textarea
              errorMessage={formState.errors.content?.join(", ")}
              isInvalid={!!formState.errors.content}
              label="Content"
              labelPlacement="outside"
              name="content"
              placeholder="Content"
            />
            {formState.errors.general && (
              <div className="border border-red-400 bg-red-100 p-2 text-red-700">
                {formState.errors.general.join(", ")}
              </div>
            )}
            <SubmitButton>Create</SubmitButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
