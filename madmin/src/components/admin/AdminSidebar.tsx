"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  MessageSquareQuote,
  Users,
  Settings,
  Star,
} from "lucide-react";
import { logout } from "@/services/user.api";

const AdminSidebar: React.FC = () => {
  const navItems = [
    { href: "/admindashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admincontent", icon: FileEdit, label: "Content Editor" },
    { href: "/admintestimonials", icon: MessageSquareQuote, label: "Testimonials" },
    { href: "/adminclient", icon: Users, label: "Clients" },
  ];

    const items = [
    { href: "/register", icon: MessageSquareQuote, label: "Login" },

  ];

  const pathname = usePathname() || "/";
  const handelLogout=async()=>{
   try {
     const res=await logout()
     return res
   } catch (error) {
    console.log("logout failed",error)
   }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-border bg-gradient-to-b from-background via-background to-muted/30">
      {/* Top */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl border border-border bg-gradient-to-br from-sky-500/15 via-emerald-500/10 to-background flex items-center justify-center shadow-sm">
            <Star className="w-5 h-5 text-sky-600 dark:text-sky-300" />
          </div>

          <div className="min-w-0">
            <h1 className="font-heading text-lg font-semibold tracking-tight">
              Bloom
            </h1>
            <p className="text-xs text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </div>

        {/* little accent */}
        <div className="mt-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-sky-500/70 via-emerald-500/50 to-transparent" />
      </div>

      {/* Nav */}
      <nav className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  "hover:bg-muted/60 hover:shadow-[0_1px_0_rgba(0,0,0,0.04)]",
                  isActive
                    ? "bg-muted/70 text-foreground ring-1 ring-primary/15"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {/* active left bar */}
                <span
                  className={[
                    "h-5 w-1 rounded-full transition-opacity",
                    isActive ? "bg-sky-500/70 opacity-100" : "bg-transparent opacity-0",
                  ].join(" ")}
                />

                <item.icon
                  className={[
                    "w-5 h-5 transition-colors",
                    isActive
                      ? "text-sky-600 dark:text-sky-300"
                      : "text-muted-foreground group-hover:text-foreground",
                  ].join(" ")}
                />

                <span className="font-medium">{item.label}</span>

                {/* tiny active dot */}
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500/70" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <nav className="pt-60 p-4">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  "hover:bg-muted/60 hover:shadow-[0_1px_0_rgba(0,0,0,0.04)]",
                  isActive
                    ? "bg-muted/70 text-foreground ring-1 ring-primary/15"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {/* active left bar */}
                <span
                  className={[
                    "h-5 w-1 rounded-full transition-opacity",
                    isActive ? "bg-sky-500/70 opacity-100" : "bg-transparent opacity-0",
                  ].join(" ")}
                />

                <item.icon
                  className={[
                    "w-5 h-5 transition-colors",
                    isActive
                      ? "text-sky-600 dark:text-sky-300"
                      : "text-muted-foreground group-hover:text-foreground",
                  ].join(" ")}
                />

                <span className="font-medium">{item.label}</span>

                {/* tiny active dot */}
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500/70" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-border bg-background/60 backdrop-blur">
      <button onClick={handelLogout}>logout</button>
        <Link
          href="/adminsetting"
          className={[
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
            "hover:bg-muted/60",
            pathname === "/adminsetting"
              ? "bg-muted/70 text-foreground ring-1 ring-primary/15"
              : "text-muted-foreground",
          ].join(" ")}
        >
          <Settings
            className={[
              "w-5 h-5 transition-colors",
              pathname === "/adminsetting"
                ? "text-sky-600 dark:text-sky-300"
                : "text-muted-foreground group-hover:text-foreground",
            ].join(" ")}
          />
          <span className="font-medium">Settings</span>
        </Link>
        
      </div>
    </aside>
  );
};

export default AdminSidebar;
