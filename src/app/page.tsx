import { ContentSection } from '@/components/home/ContentSection';
import { HeaderSection } from '@/components/home/HeaderSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to shortie'
}

export default async function Home() {  
  return (
    <>
      <div className='flex flex-wrap items-center'>
        <div className='mt-16'>
          <HeaderSection/>
        </div>
        <section className='w-full mt-7'>
          <ContentSection/>
        </section>
      </div>
    </>
  );
}
