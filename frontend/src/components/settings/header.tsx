"use client";

import { cn } from "@/lib/utilities";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsHeader = () => {
  const pathname = usePathname()
  return (
    <header>
      <nav className="flex items-center">
        <Link href="/settings" className={cn("border border-slate-300 py-2 px-4 rounded-l-lg",
          pathname === "/settings" && "bg-gray-300"
        )}>Profile</Link>
        <Link href="/settings/password" className={cn("border border-slate-300 py-2 px-4 rounded-r-lg",
          pathname === "/settings/password" && "bg-gray-300"
        )}>Password</Link>
      </nav>
    </header>
  )
}

export default SettingsHeader;
