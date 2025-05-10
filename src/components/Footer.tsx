'use client'
import { Link } from "@heroui/react";
import { Heart } from 'lucide-react';
import NextLink from 'next/link';


export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 mt-11">
      <span className="flex items-center gap-1 text-current">
        <Heart className='text-red-500 w-5 h-5 inline' strokeWidth={3}/> Created By Santiago using 
        <Link
          as={NextLink}
          isExternal
          className='text-primary-500'
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          HeroUI
        </Link>
      </span>


    </footer>
  ) 
}