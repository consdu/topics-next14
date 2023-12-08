"use client";

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session?.data?.user) {
    const { user } = session.data;

    authContent = (
      <Popover placement="left" radius="md">
        <PopoverTrigger>
          <Avatar src={user.image!} className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else if (session.status === "loading") {
    authContent = <Avatar className="animate-pulse" icon={null} />;
  } else {
    authContent = (
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="primary" variant="flat">
            Sign In
          </Button>
        </form>
      </NavbarItem>
    );
  }
  return authContent;
}
