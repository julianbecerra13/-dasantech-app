"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/lib/auth";
import ThemeToggle from "./ThemeToggle";
import { Code2, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code2 className="text-accent" size={24} />
          <span className="gradient-text">JB</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            API Docs
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-400 transition-colors"
              >
                <LogOut size={14} />
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Iniciar sesion
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm text-muted-foreground">
            Inicio
          </Link>
          <Link href="/docs" onClick={() => setMenuOpen(false)} className="block text-sm text-muted-foreground">
            API Docs
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-sm text-muted-foreground">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block text-sm text-red-400">
                Salir
              </button>
            </>
          ) : (
            <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="block text-sm text-accent">
              Iniciar sesion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
