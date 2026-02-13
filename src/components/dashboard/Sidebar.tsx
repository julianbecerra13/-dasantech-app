"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logoutUser, getDisplayName } from "@/lib/auth";
import { cn } from "@/lib/cn";
import {
  Code2,
  LayoutDashboard,
  Search,
  FolderOpen,
  LogOut,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const links = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { href: "/dashboard/scraping", label: "Web Scraping", icon: Search },
  { href: "/dashboard/projects", label: "Proyectos", icon: FolderOpen },
  { href: "/docs", label: "API Docs", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const navContent = (
    <>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <Code2 className="text-accent" size={24} />
        <span className="font-bold gradient-text">Dashboard</span>
      </div>

      <div className="px-3 py-4 flex-1">
        <p className="text-xs text-muted-foreground px-3 mb-3 uppercase tracking-wider">
          Menu
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname === link.href
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between px-3">
          <span className="text-sm text-muted-foreground truncate">
            {getDisplayName(user)}
          </span>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut size={18} />
          Cerrar sesion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Code2 className="text-accent" size={20} />
          <span className="font-bold gradient-text text-sm">Dashboard</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border flex flex-col transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-card border-r border-border flex-col">
        {navContent}
      </aside>
    </>
  );
}
