"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WaitingApprovalPage = () => {
  const session = useSession();
  const router = useRouter();
  const email = session?.data?.user?.email;
  const user = useQuery(api.user.getUserByEmail, email ? { email } : "skip");

  if (session.status === "loading" || user === undefined) {
    return (
      <section className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300">
        <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full border border-indigo-200">
          <div className="mb-6 flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-indigo-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-indigo-800 mb-2 text-center">
              Loading...
            </h1>
            <p className="text-gray-600 text-center max-w-xs">
              Please wait while we load your account status.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (user?.status === "approved") {
    return (
      <section className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300">
        <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full border border-indigo-200">
          <div className="mb-6 flex flex-col items-center">
            <svg
              className="h-10 w-10 text-green-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-green-800 mb-2 text-center">
              Account Approved!
            </h1>
            <p className="text-gray-600 text-center max-w-xs">
              Your account has been approved. You can now access the dashboard.
            </p>
          </div>
          <Button
            asChild
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          >
            <Link href="/">Go to Dashboard</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full border border-indigo-200">
        <div className="mb-6 flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-indigo-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-indigo-800 mb-2 text-center">
            Your account is pending approval
          </h1>
          <p className="text-gray-600 text-center max-w-xs">
            Thank you for completing your profile! Your account is currently
            under review by an administrator. You will be notified once your
            access is approved.
          </p>
        </div>
        <div className="w-full flex flex-col items-center mt-4">
          <div className="text-indigo-500 font-medium text-sm mb-2">
            This page will update automatically when your account is approved.
          </div>
          <div className="text-xs text-gray-400">
            If you have questions, please contact support.
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingApprovalPage;
