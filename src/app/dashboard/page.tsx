"use client";

import { useAuth } from "@/context/AuthContext";
import { getDisplayName } from "@/lib/auth";
import ContactInfo from "@/components/dashboard/ContactInfo";
import Experience from "@/components/dashboard/Experience";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Hola, <span className="gradient-text">{getDisplayName(user)}</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bienvenido al portafolio de Julian Becerra
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>
        <div className="lg:col-span-2">
          <Experience />
        </div>
      </div>
    </div>
  );
}
