'use client'
import { Button, ScrollShadow, useDisclosure } from '@heroui/react'
import { Link2, Pen, Tags, Trash } from 'lucide-react'
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { CreateTagModal } from "@/components/CreateTagModal";
import { SelectTags } from '@/db/db-schemas';
import { EditTagModal } from './EditTagModal';
import { DeleteTagModal } from './DeleteTagModal';

export function AsideOptions({tags}: {tags: SelectTags[] | []}) {
  const { 
    isOpen: islinkModalOpen,
    onOpen: onlinkModalOpen,
    onOpenChange: onlinkModalOpenChange
  } = useDisclosure()
  const { 
    isOpen: istagModalOpen,
    onOpen: ontagModalOpen,
    onOpenChange: ontagModalOpenChange
  } = useDisclosure()
  const { 
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange
  } = useDisclosure()
  const { 
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange
  } = useDisclosure()

  return (
    <div>
      <ScrollShadow className='p-3 md:p-0 flex justify-center ml-auto mr-auto w-11/12 overflow-x-auto md:overflow-visible md:full md:justify-start md:m-0' orientation='horizontal'>
        <div>
          <div className='flex gap-2 w-min md:flex-col'>
            <Button
              className='text-left md:w-full md:justify-start bg-transparent border border-transparent hover:border-default data-[hover=true]:bg-default-100 data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100 data-[hover=true]:transition-colors data-[hover=true]:text-primary data-[selectable=true]:focus:text-primary'
              key='new_link'
              startContent={<Link2 className='w-4 h-4 md:w-5 md:h-5'/>}
              onPress={onlinkModalOpen}
            >
              <div>
                <p className='text-start'>New LInk</p>
                <p className='text-start hidden md:block'>Create a new link</p>
              </div>
            </Button>
            <Button
              className='text-left md:w-full md:justify-start bg-transparent border border-transparent hover:border-default data-[hover=true]:bg-default-100 data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100 data-[hover=true]:transition-colors data-[hover=true]:text-primary data-[selectable=true]:focus:text-primary'
              key='create_tag'
              startContent={<Tags className='w-4 h-4 md:w-5 md:h-5'/>}
              onPress={ontagModalOpen}
            >
              <div>
                <p className='text-start'>New tag</p>
                <p className='text-start hidden md:block'>create a new tag</p>
              </div>
            </Button>
                
            <Button
              className='text-left md:w-full md:justify-start bg-transparent border border-transparent hover:border-default data-[hover=true]:bg-default-100 data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100 data-[hover=true]:transition-colors data-[hover=true]:text-primary data-[selectable=true]:focus:text-primary'
              key='edit_tags'
              startContent={<Pen className='w-4 h-4 md:w-5 md:h-5'/>}
              onPress={onEditModalOpen}
            >
              <div>
                <p className='text-start'>Edit tags</p>
                <p className='text-start hidden md:block'>Edit existing tags</p>
              </div>
            </Button>
                            
            <Button
              className='text-left  md:w-full md:justify-start bg-transparent border border-transparent hover:border-default data-[hover=true]:bg-default-100 data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100 data-[hover=true]:transition-colors data-[hover=true]:text-danger data-[selectable=true]:focus:text-danger'
              key='delete_tags'
              startContent={<Trash className='w-4 h-4 md:w-5 md:h-5'/>}
              onPress={onDeleteModalOpen}
            >
              <div>
                <p className='text-start'>Delete tags</p>
                <p className='text-start hidden md:block'>Delete existing tags</p>
              </div>
            </Button>
          </div>
        </div>
      </ScrollShadow>

      <CreateLinkModal
        onOpenChange={onlinkModalOpenChange}
        isModalOpen={islinkModalOpen}
        tags={tags}
      />
      
      <CreateTagModal onOpenChange={ontagModalOpenChange} isModalOpen={istagModalOpen}/>
      <EditTagModal tags={tags} onOpenChange={onEditModalOpenChange} isModalOpen={isEditModalOpen}/>
      <DeleteTagModal tags={tags} onOpenChange={onDeleteModalOpenChange} isModalOpen={isDeleteModalOpen} />
    </div>
    // <div className='flex flex-nowrap md:flex-wrap md:w-full'>
  )
}
 