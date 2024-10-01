"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Incidents", path: "/dashboard/incidents" },
    // ... other menu items
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className='flex justify-between items-center mb-8'>
          <div className='w-8 h-8 bg-green-500 rounded-full'></div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsOpen(false)}
            className='lg:hidden'
          >
            <X className='h-6 w-6' />
          </Button>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className='mb-2'>
                <Link
                  href={item.path}
                  className='block p-2 hover:bg-gray-800 rounded'
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
