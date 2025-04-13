import { AsideOptions } from './AsideOptions';
import { AsideHeader } from './AsideHeader';
import { SelectTags } from '@/db/db-schemas';

export async function DashboardAside({tags}: {tags: SelectTags[]}) {
  
  return (
    <>
      <aside className='flex justify-center items-end gap-2 w-full flex-wrap md:flex-col md:justify-start md:items-start md:w-52 md:pl-2 md:pr-2'>
        <AsideHeader tags={tags ?? []}/>
        <AsideOptions tags={tags ?? []}/>
      </aside>
    </>
  );
}