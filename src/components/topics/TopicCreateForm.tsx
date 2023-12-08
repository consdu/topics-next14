"use client";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import SubmitButton from "../shared/SubmitButton";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });

  return (
    <Popover placement="left" radius="sm">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors.general ? (
              <div className="p-2 bg-red-100 border border-red-400 text-red-700">
                {formState.errors.general?.join(", ")}
              </div>
            ) : null}
            <SubmitButton>Create</SubmitButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
