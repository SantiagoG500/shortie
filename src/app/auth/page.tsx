import { auth } from '@/auth'
import { AuthForm } from '@/components/AuthForm'

export default async function Auth() {
  return (
    <div className='h-5/6 flex flex-col items-center justify-center'>
      {/* <div className='w-11/12 max-w-96 min-w-72 p-4 rounded border border-stone-700 bg-stone-900'> */}
      <div className='w-11/12 max-w-96 min-w-72 p-4'>

        <div className='w-full mb-4'>
          <h1 className='text-center text-2xl mb-1 font-bold'>Welcome to shortie</h1>
          <p className='text-center'>Login with one of these socials providers</p>
        </div>

        <AuthForm/>
      </div>
    </div>
  )

}