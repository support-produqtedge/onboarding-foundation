"use client";

import Link from "next/link";
import Image from "next/image";
import { useSidebarContext } from "../sidebar/sidebar-context"
import { MenuIcon } from "./icons";
import { ChevronRight } from "../icons";
import { usePathname } from "next/navigation";

interface HeaderProps {
  name: string;
}

export const Header = ({ name }: HeaderProps) => {
  const path = usePathname();
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="z-10 top-0 flex items-center justify-between border-b border-slate-300 bg-white px-4 py-5 shadow-1 md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <div className="flex items-center gap-1 mb-4">
          <div className="rounded w-[40px] h-[40px] bg-gray-200">

          </div>
          <p className="text-[12px]">{name}</p>
          <ChevronRight />
          <p className="text-[12px]">{path.replace(/\//g, "")}</p>
        </div>
        <h1 className="mb-0.5 text-2xl font-bold text-dark">
          {
            path === "/dashboard" && "Dashboard"
          }
          {
            path === "/user-management" && "User Management"
          }
          {
            path === "/role-management" && "Role Management"
          }
        </h1>
      </div>

    </header>
  )
}
