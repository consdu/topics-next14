"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import SubmitButton from "../shared/SubmitButton";

interface PostCreateFormProps {
  topicSlug: string;
}
export default function PostCreateForm({ topicSlug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, topicSlug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors.general && (
              <div className="p-2 bg-red-100 border border-red-400 text-red-700">
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
