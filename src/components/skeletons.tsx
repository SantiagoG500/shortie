import { Button, Card, Input, Skeleton } from '@heroui/react';
import { Link2, Search,TagsIcon } from 'lucide-react';

export function SkeletonDashboard() {
  return (
    <>
      <SkeletonAside />
      <div className='flex h-full w-full p-4'>
        <section className='h-min w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
          
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>

        </section>
      </div> 
    </>
  )
}

export function SkeletonAside() {
  return (
    <>
      <aside className='flex justify-center items-end gap-2 w-full flex-wrap md:flex-col md:justify-start md:items-start md:w-52 md:pl-2 md:pr-2'>
        <header className='md:w-full'>
          <div>
          
          </div>
            <Input
              className='mt-2'
              placeholder='Search link title'
              color='primary'
              variant='bordered'
              startContent={<Search className='h-4 w-4 text-stone-500' />}
              disabled={true}
            />
        </header>
      </aside>
    </>
  )
}


export function SkeletonCard() {
  return(
    <Card className="bg-default-50 space-y-5 p-4" radius="lg">

    <div className='flex justify-between'>
      <Skeleton className="rounded-lg w-3/4 h-4 block">
        <div className="h-2 rounded-lg bg-default-300" />
      </Skeleton> 
      <Skeleton className="rounded-lg w-1/6 h-4 block">
        <div className="h-2 rounded-lg bg-default-300" />
      </Skeleton> 
    </div>


    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded">
        <div className="h-3 w-3/5 rounded bg-default-200" />
      </Skeleton>

      <div className='flex justify-between'>
        <Skeleton className="w-4/5 rounded">
          <div className="h-3 w-4/5 rounded bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4 h-4 rounded">
          <div className="w-4 h-4 rounded bg-default-200" />
        </Skeleton>
      </div>


      <div className='flex justify-between'>
        <Skeleton className="w-2/5 rounded">
          <div className="h-3 w-2/5 rounded bg-default-300" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded">
          <div className="h-3 w-2/5 rounded bg-default-300" />
        </Skeleton>
      </div>
    </div>
  </Card>
  )
}