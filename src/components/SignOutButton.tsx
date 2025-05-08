'use client'
import { Button } from '@heroui/react';
import { signOut } from 'next-auth/react';
import { LogOut } from "lucide-react";

async function handleSignOut () { 
  await signOut({
    redirectTo: '/'
  })
}

export function SignOutButton() {
  return (
    <Button
      className='ml-4'
      color='danger'
      variant='light'
      isIconOnly={true}
      onPress={handleSignOut}
    >
      <LogOut/>
    </Button>
  )
}