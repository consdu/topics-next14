import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "@/components/HeaderAuth";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";

export default async function Header() {
  return (
    <Navbar className="shadow mb-6 py-2">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Topics
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}