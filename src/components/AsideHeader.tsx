import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, SharedSelection, Input } from '@heroui/react';
import { ListFilter, Search } from 'lucide-react';
;
interface Tag {
  key: string;
  label: string;
}

interface AsideHeaderProps {
  tags: Tag[];
  selectedTags: Set<string>;
  setSelectedTags: (keys: SharedSelection) => void
}

export function AsideHeader() {
  return (
    <header className='md:w-full'>
      <div>
      
      </div>
      <Input
        className='mt-2'
        placeholder='Search link title'
        color='primary'
        variant='bordered'
        startContent={<Search className='h-4 w-4 text-stone-500' />}
      />
    </header>
  );
}

{/* <Dropdown>
<DropdownTrigger>
  <Button startContent={<ListFilter className='w-4 h-4 text-stone-500' />} size='sm' variant='light' className='text-stone-400 '>Add Filter</Button>
</DropdownTrigger>
<DropdownMenu
  variant='faded'
  color='primary'
  aria-label="Static Actions"
  items={tags}
  selectionMode='multiple'
  closeOnSelect={false}
  selectedKeys={selectedTags}
  onSelectionChange={handleSelectionChange}
>
  {(tag) => (
    <DropdownItem key={tag.key}>{tag.label}</DropdownItem>
  )}
</DropdownMenu>
</Dropdown> */}