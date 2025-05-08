import { AsideOptions } from './AsideOptions';
import { AsideHeader } from './AsideHeader';
import { SelectTags } from '@/db/db-schemas';
import { Divider } from '@heroui/react';

export async function DashboardAside({tags}: {tags: SelectTags[]}) {
  
  return (
    <>
      <aside className='flex flex-col gap-2 w-full md:flex-row md:w-min  md:justify-start md:flex-wrap md:h-screen md:sticky md:top-16 md:pl-1 md:pr-1'>
        <div>
          <AsideHeader tags={tags ?? []}/>
          <Divider className='ml-auto mr-auto mt-6 mb-3 w-5/6 hidden md:block'/>
          <AsideOptions tags={tags ?? []}/>
        </div>
      </aside>
    </>
  );
}