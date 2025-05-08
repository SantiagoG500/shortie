import { auth } from '@/auth';
import { DashboardAside } from '@/components/DashboardAside';
import { DashboardContent } from '@/components/DashboardContent';
import { getLinksAndTags } from '@/server/actions/link';
 
type SearchParams = {
  search?: string
  tags?: string
}

export default async function Dashboard({ searchParams }: {searchParams: Promise<SearchParams>}) {
  const sessionData = await auth()
  const { search, tags } = await searchParams

  const {
    links,
    tags: tagsByUser
  } = await getLinksAndTags({searchTitle: search, selectedTags: tags?.split(',')})
  
  return (
    <>
      <div className='w-full md:flex md:relative'>  
        <DashboardAside tags={tagsByUser ?? []}/>
        <div className='flex h-full w-full p-4'>
          
          <section className='h-min w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
            {
              links && 
              <DashboardContent
                links={links ?? []}
                tags={tagsByUser ?? []}
              />
            }
          </section>
        </div>
      </div>
    </>
  )
}
