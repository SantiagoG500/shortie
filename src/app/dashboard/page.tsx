import { auth } from '@/auth';
import { DashboardAside } from '@/components/DashboardAside';
import { DashboardContent } from '@/components/DashboardContent';
import { getLinks } from '@/server/actions/link';

  
export default async function Dashboard() {
  const fetchedLinks = await getLinks({})
  const sessionData = await auth()

  return (
    <>
      <div className='flex flex-col h-full md:flex-row'>
        <DashboardAside/>
        <div className='flex h-full w-full p-4'>
          
          <section className='h-min w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
          
            {
              fetchedLinks.data && <DashboardContent links={fetchedLinks.data} />
            }


          </section>
        </div>
      </div>
    </>
  )
}
