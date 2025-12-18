"use client";

import { Logo } from "../logo";
import { cn } from "@/lib/utilities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ArrowLeftIcon, AuditIcon, ChevronUpDown, DashboardIcon, RoleManagementIcon, UserManagementIcon } from '../icons';
import { MenuItem } from "../menu-item";
import { useSidebarContext } from "./sidebar-context";

const NAV_DATA = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <DashboardIcon />,
        items: [],
      },
      {
        title: "User Management",
        url: "/user-management",
        icon: <UserManagementIcon />,
        items: [],
      },
      {
        title: "Role Management",
        url: "/role-management",
        icon: <RoleManagementIcon />,
        items: [],
      },
      {
        title: "Audit Logs",
        url: "/audit-logs",
        icon: <AuditIcon />,
        items: [],
      }
    ],
  },
];


export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-72.5 overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-6.25 pr-1.75">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section, i) => (
              <div key={i} className="mb-6">

                <nav role="navigation" >
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={String(item) + i}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(
                                ({ url }) => url === pathname,
                              )}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              {item.icon}

                              <span>{item.title}</span>
                            </MenuItem>
                          </div>
                        ) : (
                          (() => {
                            const href =
                              "url" in item
                                ? item.url + ""
                                : "/"


                            return (
                              <MenuItem
                                className="flex items-center gap-3 py-3"
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                {item.icon}

                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-slate-300 p-3">
            <div className="rounded-full w-10 h-10 bg-gray-500"></div>
            <div>
              <h1 className="text-lg font-semibold">Jane Doe</h1>
              <p className="text-sm text-slate-500">jane@doe.com</p>
            </div>
            <div className="ml-auto">
              <ChevronUpDown />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
