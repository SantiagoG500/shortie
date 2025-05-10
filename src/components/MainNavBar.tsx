'use client'

import { Avatar, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuToggle, NavbarMenuItem } from '@heroui/react';
import { LogIn } from 'lucide-react';
import { Session } from 'next-auth';
import NextLink from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function MainNavBar({session}: {session: Session | null}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()
  
  return (
    <Navbar
      position='sticky'
      className='h-14  mb-4 data-[active=true]:'
      onMenuOpenChange={setIsMenuOpen}
    >
      
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
        <div className="mx-4 mt-2 flex flex-col gap-2 data-[active=true]:text-primary-500">
          <NavbarMenuItem isActive={pathName === '/'}>
          <Link color='foreground' href='/' as={NextLink}>Home</Link>
          </NavbarMenuItem>
          {session && (
            <NavbarMenuItem isActive={pathName === '/dashboard'}>
              <Link color='foreground' href='/dashboard' as={NextLink}>Dashboard</Link>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>

      <NavbarContent className="hidden sm:flex gap-4 data-[active=true]:text-primary-500" justify="center">
        {session && (
          <>
            <NavbarItem isActive={pathName === '/'}>
              <Link color='foreground' href='/' as={NextLink}>Home</Link>
            </NavbarItem>
            <NavbarItem isActive={pathName === '/dashboard'}>
              <Link color='foreground' href='/dashboard' as={NextLink}>Dashboard</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>


      <NavbarContent justify="end">       
        {!session
          ? <NavbarItem isActive={pathName === '/auth'}>
              <Button
                as={Link}
                className='font-semibold'
                color='primary'
                variant='shadow'
                size='sm'
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