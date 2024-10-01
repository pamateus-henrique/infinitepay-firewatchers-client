"use client";
import React from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <div className='fixed top-0 left-0 right-0 h-14 bg-gray-900 border-b border-gray-200 flex items-center justify-between px-4 lg:hidden'>
      <Button
        variant='ghost'
        size='icon'
        className='hover:bg-gray-800'
        onClick={toggleSidebar}
      >
        <Menu className='h-6 w-6' color='white' />
      </Button>
      <Button variant='ghost' size='icon' className='hover:bg-gray-800'>
        <User className='h-6 w-6' color='white' />
      </Button>
    </div>
  );
};

export default Topbar;
