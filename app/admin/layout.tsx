"use client";

import AdminMobileSwitcher from "@/components/admin/layout/AdminMobileSwitcher";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { ReactNode } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  
 const { user } = useAuth();
 const router = useRouter();


 if(user?.role === "user") {
    return (
      router.push("/user/myCourses")
    )
  }else{
    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-white">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        {children}
        <AdminMobileSwitcher />
      </main>
    </div>
    )
  }
}