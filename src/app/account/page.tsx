import { auth } from '@/auth'
import { UserInfo } from '@/components/UserInfo'

export default async function Account() {
  const session = await auth()

  const userName = session?.user?.name as string
  const email = session?.user?.email as string


  return (
    <>
      <main className='pl-7 pr-7 '>
      
        <div className='flex justify-center gap-5 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold mb-5'>General Information</h2>
            <UserInfo
              userName={userName}
              email={email}
              avatarImg={session?.user?.image ?? ''}
            />
          </div>
        </div>
        
      </main>
    </> 
  )
}
