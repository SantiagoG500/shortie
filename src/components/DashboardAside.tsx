'use client';

import { AsideOptions } from './AsideOptions';
import { AsideHeader } from './AsideHeader';

export function DashboardAside() {
  return (
    <>
      <aside className='flex justify-center items-end gap-2 w-full flex-wrap md:flex-col md:justify-start md:items-start md:w-52 md:pl-2 md:pr-2'>
        <AsideHeader/>
        <AsideOptions/>
      </aside>
    </>
  );
}