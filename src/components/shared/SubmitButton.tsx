"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function SubmitButton({
  children,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className={className}>
      {children}
    </Button>
  );
}
