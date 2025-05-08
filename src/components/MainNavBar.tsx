'use client'

import { Avatar, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuToggle } from '@heroui/react';
import { LogIn } from 'lucide-react';
import { Session } from 'next-auth';
import NextLink from 'next/link';
import { useState } from 'react';

export function MainNavBar({session}: {session: Session | null}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <Navbar position='sticky' className='h-14  mb-4' onMenuOpenChange={setIsMenuOpen}>
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden "
      />

      <NavbarBrand>
        <p className="font-bold text-inherit">Shortie</p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarMenu>
      <div className="mx-4 mt-2 flex flex-col gap-2">
        <NavbarItem>
          <Link color='foreground' href='/' as={NextLink}>Home</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color='foreground' href='/dashboard' as={NextLink}>Dashboard</Link>
        </NavbarItem>
      </div>
    </NavbarMenu>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {session && (
        <>
          <NavbarItem>
            <Link color='foreground' href='/' as={NextLink}>Home</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color='foreground' href='/dashboard' as={NextLink}>Dashboard</Link>
          </NavbarItem>
        </>
      )}

    </NavbarContent>

    <NavbarContent justify="end">       
      {!session
        ? <NavbarItem>
            <Button
              as={Link}
              className='border hover:border-default data-[hover=true]:bg-default-100 data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100 data-[hover=true]:transition-colors data-[hover=true]:text-primary data-[selectable=true]:focus:text-primary'

              variant='bordered'
              href="/auth"
              endContent={<LogIn className='w-5 h-5'/>}
            >

              Sign In
            </Button>
          </NavbarItem>
        : <Link as={NextLink} href='/account'>
            <Avatar
              src={session.user?.image || undefined}
            />
          </Link>
      }
    </NavbarContent>
  </Navbar>
  )
}