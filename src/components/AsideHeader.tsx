'use client'

import { MAX_TAGS_PER_LINK } from '@/constants';
import { SelectTags } from '@/db/db-schemas';
import { Input, Select, Selection, SelectItem } from '@heroui/react';
import { FilterIcon, Search } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'
;
interface AsideHeaderProps {
  tags: SelectTags[] | [];
}

export function AsideHeader({tags}: AsideHeaderProps) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set([]))

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const sParams = new URLSearchParams(searchParams)
      const value = event.target.value
      
      if (value) sParams.set('search', value)
      else sParams.delete('search')

      router.replace(`${pathName}?${sParams.toString()}`, {scroll: false})
    },
    600
  )

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valuesArray = e.target.value.split(",").filter(Boolean)
    const sParams = new URLSearchParams(searchParams)
    
    if (valuesArray.length > MAX_TAGS_PER_LINK) return

    if (valuesArray.length === 0) sParams.delete('tags')
    else sParams.set('tags', valuesArray.join(','))
    
    setSelectedTags(new Set(valuesArray));
    router.replace(`${pathName}?${sParams.toString()}`, { scroll: false })
  };
  
  return (
    <header className='md:w-full'>
      <div className='flex flex-col gap-2'>
        <Input
          className='mt-2'
          placeholder='Search link title'
          color='primary'
          variant='bordered'
          startContent={<Search className='h-4 w-4 text-stone-500' />}
          onChange={handleSearch}
        />
        <Select
          className='text-default-500'
          placeholder="search by tag"
          variant='bordered'
          size='sm'
          selectionMode='multiple'
          aria-label='search by tag'
          disabled={tags.length === 0}

          startContent={<FilterIcon className='h-4 w-4 text-stone-500'/>}
          selectedKeys={selectedTags}
          onChange={handleSelectionChange}
        >
        {
          tags.map((tag) => (
            <SelectItem key={tag.id}>
              {tag.title}
            </SelectItem>
          ))
        }
        </Select>
      </div>
    </header>
  );
}
