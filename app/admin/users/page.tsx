"use client";

import UserTable from "@/components/admin/user/UserTable";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminCoursesPage() {

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            View Users
          </h1>
        </div>

        {/* Table */}
        <UserTable />
      </div>
    </section>
  );
}
