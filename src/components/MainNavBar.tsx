'use client'

import { Avatar, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Image } from '@heroui/react';
import { Session } from 'next-auth';
import NextLink from 'next/link';

export function MainNavBar({session}: {session: Session | null}) {
  
  return (
    <Navbar position='sticky' className='h-14  mb-4' >
    <NavbarBrand>
      <p className="font-bold text-inherit">Shortie</p>
    </NavbarBrand>
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
            <Button as={Link} color="primary" href="/auth" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
        : <Avatar
            src={session.user?.image || undefined}
          />
      }
    </NavbarContent>

  </Navbar>
  )
}