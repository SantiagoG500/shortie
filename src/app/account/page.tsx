import { auth } from '@/auth'
import { SignOutButton } from '@/components/SignOutButton'
import { Button, Input } from '@heroui/react'
import { signOut } from 'next-auth/react'


export default async function Account() {
  const session = await auth()

  const userName = session?.user?.name as string
  const email = session?.user?.email as string


  return (
    <>
      <main className='pl-7 pr-7 '>
      
        <div className='flex justify-center gap-5 flex-wrap'>
          <section className='w-2/6 min-w-80'>
            <h2 className='text-2xl font-bold mb-5'>General Information</h2>

            <section className='flex flex-col gap-2 p-4 rounded-md bg-stone-800'>
              <Input value={userName} label='name' variant='underlined'/>
              <Input value={email} label='name' disabled={true} variant='underlined'/>
            </section>
          </section>

          <section className='w-2/6 min-w-80'>
            <h2 className='text-2xl font-bold mb-5'>Sesstion</h2>

            <section className='flex flex-col gap-2 p-4 rounded-md bg-stone-800'>
              <h3 className='text-xl font-bold'>Current Session</h3>
              <SignOutButton/>
            </section>

            <section className='flex flex-col gap-2 p-4 rounded-md bg-stone-800'>
              <h3 className='text-xl font-bold'>Sessions</h3>

              <ul>
                <li className='hover:bg-stone-700 p-2 w-full'>
                  <header>Windows</header>
                  <section>Last Sestion: 2024-02-7</section>
                </li>
                <li className='hover:bg-stone-700 p-2 w-full'>
                  <header>Firefox</header>
                  <section>Last Sestion: 2024-02-7</section>
                </li>
                <li className='hover:bg-stone-700 p-2 w-full'>
                  <header>Android</header>
                  <section>Last Sestion: 2024-02-7</section>
                </li>
                <li className='hover:bg-stone-700 p-2 w-full'>
                  <header>Iphone</header>
                  <section>Last Sestion: 2024-02-7</section>
                </li>
              </ul>
              
            </section>
          </section>

        </div>

      </main>
    </> 
  )
}
