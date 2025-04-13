'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip, useDisclosure } from '@heroui/react'
import { Link2, Pen, Tag, Tags, Trash } from 'lucide-react'
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { CreateTagModal } from "@/components/CreateTagModal";
import { SelectTags } from '@/db/db-schemas';

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
  

  return (
    <div className='flex flex-nowrap md:flex-wrap md:w-full'>
      <Tooltip
        placement='right'
        showArrow={true}
        delay={2}
        closeDelay={2}
        content={<p>You can create a total of <b className='text-primary-400'>20 links</b></p>}
      >
        <Button
          className='text-foreground text-left md:w-full md:justify-start'
          variant='light'
          startContent={<b className='text-primary-500'>20</b>}
        >
          Links left
        </Button>
      </Tooltip>
      
      <div>
        <Button 
          className='text-left text-foreground md:w-full md:justify-start'
          variant='light'
          onPress={onlinkModalOpen}
          startContent={<Link2 className='text-primary-500 w-5 h-5'/>}
        >
            New LInk
        </Button>


        <Dropdown>
          <DropdownTrigger>
            <Button
              className='text-left text-foreground md:w-full md:justify-start'
              variant='light'
              startContent={<Tag className='text-primary-500 w-5 h-5'/>}
            >
                Tags
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant='faded' color='primary'>
            <DropdownItem
              key='create_tag'
              description='create a new tag'
              startContent={<Tags/>}
              onPress={ontagModalOpen}
            >
                New tag
              </DropdownItem>
            <DropdownItem
              key='edit_tags'
              description='Edit existing tags'
              startContent={<Pen/>}
            >
                Edit tags
            </DropdownItem>
            <DropdownItem
              key='delete_tags'
              color='danger'
              description='Delete existing tags'
              startContent={<Trash/>}
            >
              Delete tags
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <CreateLinkModal
        onOpenChange={onlinkModalOpenChange}
        isModalOpen={islinkModalOpen}
        tags={tags}
      />
      <CreateTagModal onOpenChange={ontagModalOpenChange} isModalOpen={istagModalOpen}/>
    </div>
  )
}