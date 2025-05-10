import { DemonstrationLinkCard } from '@/components/DemonstrationLinkCard';
import { Footer } from '@/components/Footer';
import { ContentSection } from '@/components/home/ContentSection';
import { HeaderSection } from '@/components/home/HeaderSection';

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
