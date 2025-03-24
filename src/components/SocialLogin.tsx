import { Button } from '@heroui/react';
import { signIn } from 'next-auth/react';
import Github from './icons/Github';
import Google from './icons/Google';


export function SocialLogin () {
  return (
    <div className='flex flex-col gap-4'>
        <Button
          onPress={async () => (await signIn('github', {redirect: true, redirectTo: '/dashboard'}))}
          variant='ghost'
          size='md'

          endContent={<Github height={16} width={16}/>}
        >
          Continue with Github
        </Button>
        <Button
          onPress={async () => (await signIn('google', {redirect: true, redirectTo: '/dashboard'}))}
          variant='ghost'
          size='md'
            
          endContent={<Google height={16} width={16}/>}
        >
          Continue with Google
        </Button>
      </div>
  )
}