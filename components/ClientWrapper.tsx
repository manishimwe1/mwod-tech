"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  const user = useQuery(api.users.getUserByEmail, session.data?.user ? {
    email: session?.data?.user?.email || '',
  } : 'skip');

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    // Handle loading states
    if (session.status === "loading") {
      return;
    }

    // If not authenticated via NextAuth, redirect to login
    if (session.status === "unauthenticated") {
      hasRedirected.current = true;
      router.push('/login');
      return;
    }

    // Wait for user data to load before making authorization decisions
    if (session.status === "authenticated" && user === undefined) {
      return; // Still loading user data
    }

    // If authenticated but no user found in database
    if (session.status === "authenticated" && user === null) {
      hasRedirected.current = true;
      router.push('/login');
      return;
    }

    // Authorization check: redirect based on role
    if (user?.role === 'admin') {
      if (!pathname.startsWith('/dashboard')) {
        hasRedirected.current = true;
        router.push('/dashboard');
      }
    } else if (user) {
      if (pathname !== '/') {
        hasRedirected.current = true;
        router.push('/');
      }
    }
  }, [session.status, user, router, pathname]);

  // Render nothing while loading
  if (session.status === "loading" || (session.status === "authenticated" && user === undefined)) {
    return null;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="min-h-screen justify-start py-10 items-start w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}