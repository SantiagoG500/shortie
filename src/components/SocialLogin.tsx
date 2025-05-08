import { Button } from '@heroui/react';
import { signIn } from 'next-auth/react';
import Github from './icons/Github';
import Google from './icons/Google';


export function SocialLogin () {
  return (
    <div className='flex justify-center gap-2'>
        <Button
          onPress={async () => (await signIn('github', {redirect: true, redirectTo: '/dashboard'}))}
          className='text-foreground w-1/2'
          color='primary'
          variant='faded'
          size='md'

          endContent={<Github height={16} width={16}/>}
        >
          Github
        </Button>
        <Button
          onPress={async () => (await signIn('google', {redirect: true, redirectTo: '/dashboard'}))}
          className='text-foreground w-1/2'
          color='primary'
          variant='faded'
          size='md'
            
          endContent={<Google height={16} width={16}/>}
        >
          Google
        </Button>
      </div>
  )
}