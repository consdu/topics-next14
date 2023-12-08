"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.searchFormSubmit}>
      <div className="relative">
        <Input
          name="term"
          radius="none"
          placeholder="Search a post"
          defaultValue={searchParams.get("term") ?? ""}
          type="search"
        />
      </div>
    </form>
  );
}
