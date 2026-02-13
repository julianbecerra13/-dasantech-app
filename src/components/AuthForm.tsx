"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser, registerUser } from "@/lib/auth";
import { Code2, Eye, EyeOff, Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await registerUser(email, password, name);
      } else {
        await loginUser(email, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      const errorMessages: Record<string, string> = {
        "auth/email-already-in-use": "Este correo ya esta registrado",
        "auth/weak-password": "La contrasena debe tener al menos 6 caracteres",
        "auth/invalid-email": "Correo electronico invalido",
        "auth/invalid-credential": "Credenciales incorrectas",
      };
      const message = errorMessages[firebaseError.code || ""];
      setError(
        message || `Error: ${firebaseError.code || (err as Error).message || "desconocido"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Code2 className="text-accent" size={28} />
            <span className="text-2xl font-bold gradient-text">JB</span>
          </Link>
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Iniciar sesion" : "Crear cuenta"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "login"
              ? "Accede al portafolio completo"
              : "Registrate para ver el portafolio"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          {mode === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Correo electronico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">
              Contrasena
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm pr-10"
                placeholder="Minimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {mode === "login" ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {mode === "login" ? (
            <>
              No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-accent hover:underline">
                Registrate
              </Link>
            </>
          ) : (
            <>
              Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-accent hover:underline">
                Inicia sesion
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
