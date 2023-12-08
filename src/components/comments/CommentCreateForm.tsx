"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Textarea, Button } from "@nextui-org/react";
import * as actions from "@/actions";
import SubmitButton from "@/components/shared/SubmitButton";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
  author?: string;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
  author,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label={author ? `Replying to ${author}` : "Reply"}
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
          className="pb-4"
        />

        {formState.errors.general ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors.general?.join(", ")}
          </div>
        ) : null}

        <SubmitButton>Create Comment</SubmitButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button
        size="sm"
        variant="light"
        onClick={() => setOpen(!open)}
        className="mb-4"
      >
        Reply
      </Button>
      {open && form}
    </div>
  );
}
