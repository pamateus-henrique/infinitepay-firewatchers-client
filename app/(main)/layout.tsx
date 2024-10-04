"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className='flex-1 flex flex-col'>
        <Topbar toggleSidebar={toggleSidebar} />
        <main className='flex-1 overflow-y-auto p-8 lg:pt-8 pt-20'>
          {children}
        </main>
      </div>
    </div>
  );
}
