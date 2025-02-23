'use client'
import { Button } from '@heroui/react';
import { signOut } from 'next-auth/react';

async function handleSignOut () { 
  await signOut({
    redirectTo: '/'
  })
}

export function SignOutButton() {
  return (
    <Button
      color='danger'
      variant='ghost'
      onPress={handleSignOut}
    >
      Close sesstion
    </Button>
  )
}