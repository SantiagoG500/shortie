import { auth } from '@/auth';
import { DashboardAside } from '@/components/DashboardAside';
import { LinkCard } from '@/components/LinkCard';
import { useEffect } from 'react';

export default async function Dashboard() {
  const sessionData = await auth()


  return (
    <>
      <div className='flex flex-col h-full md:flex-row'>
        <DashboardAside/>
        <div className='flex h-full w-full p-4'>
          <section className='h-min w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>

            <LinkCard
              title={'Link #1'}
              description={'Link from youtube'}
              originalLink={'https://www.youtube.com/watch?v=8eQjSQAVlwo'}
              shortenedLink={'a'}
              clicks={32}
              date={'1 January, 2025'}
            />
            <LinkCard
              title={'Link #2'}
              description={'Link from youtube'}
              originalLink={'https://www.youtube.com/watch?v=8eQjSQAVlwo'}
              shortenedLink={'a'}
              clicks={32}
              date={'1 January, 2025'}
            />
            <LinkCard
              title={'Link #3'}
              description={'Link from youtube'}
              originalLink={'https://www.youtube.com/watch?v=8eQjSQAVlwo'}
              shortenedLink={'a'}
              clicks={32}
              date={'1 January, 2025'}
            />
            <LinkCard
              title={'Link #4'}
              description={'Link from youtube'}
              originalLink={'https://www.youtube.com/watch?v=8eQjSQAVlwo'}
              shortenedLink={'a'}
              clicks={32}
              date={'1 January, 2025'}
            />
          </section>
        </div>

      </div>
    </>
  )
}