import { auth } from '@/auth'
import { AccountSettings } from '@/components/AccountSettings'
import { UserInfo } from '@/components/UserInfo'

export default async function Account() {
  const session = await auth()

  const userName = session?.user?.name as string
  const email = session?.user?.email as string


  return (
    <>
      <main className=' pl-7 pr-7'>
        <UserInfo
          userName={userName}
          email={email}
          avatarImg={session?.user?.image ?? ''}
        />
        <div className='mt-6 mx-auto max-w-md '>
          <AccountSettings email={email}/>
        </div>
      </main>
    </> 
  )
}
