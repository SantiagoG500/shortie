import { auth } from '@/auth'
import { AuthForm } from '@/components/AuthForm'

export default async function Auth() {
  const authInfo = await auth()
  return (
    <div className='h-5/6 flex flex-col items-center justify-center'>
      <div className='w-11/12 max-w-md min-w-72'>

        <div className='w-full'>
          <h1 className='text-lg font-bold'>Login</h1>
        </div>

        <AuthForm/>
      </div>
    </div>
  )

}