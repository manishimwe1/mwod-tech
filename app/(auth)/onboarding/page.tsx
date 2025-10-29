"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import SelectCategory from "@/components/SelectCategory";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status, update } = useSession(); // <-- add status
  const router = useRouter();

  // Always call the hook, use "skip" for Convex
  const user = useQuery(
    api.user.getUserByEmail,
    session?.user?.email ? { email: session.user.email } : "skip"
  );
  const updateUserRole = useMutation(api.user.updateUserRole);

  useEffect(() => {
    if (
      session?.user?.role &&
      session?.user?.status === "approved" &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/client-dashboard" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/onboarding" &&
      window.location.pathname !== "/waiting-approval"
    ) {
      if (session.user.role === "client") {
        router.push("/client-dashboard");
      } else {
        router.push("/");
      }
    }
  }, [session?.user?.role, session?.user?.status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !user) return;

    setIsLoading(true);

    try {
      // Determine status based on role
      const status = role === "client" ? "approved" : "pending";
      
      await updateUserRole({
        userId: user?._id as Id<"user">,
        fields: { 
          role: role as "client" | "accountant" | "admin" | "manager" | "cantine-committee", 
          status 
        },
      });
      await update(); // Refresh session data
      
      // Redirect based on role and status
      if (role === "client" && status === "approved") {
        router.push("/client-dashboard"); // Direct access for approved clients
      } else {
        router.push("/waiting-approval"); // Waiting approval for other roles
      }
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Conditional rendering for loading/error states
  if (status === "loading" || (session?.user?.email && user === undefined)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">User not found. Please contact support.</p>
      </div>
    );
  }

  return (
    <section className="relative w-full h-screen">
      <div className="bg-[url('/images/bgimage.jpeg')] bg-cover bg-center bg-no-repeat h-full w-full absolute inset-0" />
      <div className="bg-[url('/images/office.jpg')] absolute bg-cover bg-center bg-no-repeat h-full w-full opacity-40 inset-0" />
      <div className="h-full w-full bg-indigo-900/10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10 absolute inset-0" />
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8 border">
                      <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Complete Your Profile
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please select your role to continue
              </p>
              <p className="mt-1 text-center text-xs text-indigo-600">
                Note: Client accounts are automatically approved for immediate access
              </p>
            </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <SelectCategory
                onChange={setRole}
                addBtnText="Select a role"
                value={role}
                className="w-full"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading || !role || !user}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Updating..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
