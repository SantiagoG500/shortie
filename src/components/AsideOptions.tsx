import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@heroui/react'
import { Dice5, Link2, Tag, TagIcon, TagsIcon } from 'lucide-react'
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { CreateTagModal } from "@/components/CreateTagModal";

export function AsideOptions() {
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
        placement='top-start'
        showArrow={true}
        delay={5}
        content={<p>You can create a total of <b className='text-primary-400'>20 links</b></p>}
      >
        <Button
          className='text-foreground text-left md:w-full md:justify-start'
          variant='light'
        >
          <span> <span className='mr-2 text-primary-500 font-bold'>20</span> Links left</span>
        </Button>
      </Tooltip>
      
      <div>
        <Button 
          className='text-left text-foreground md:w-full md:justify-start'
          variant='light'
          onPress={onlinkModalOpen}
          startContent={<Link2 className='text-primary-500'/>}
        >
            New LInk
        </Button>

        <Button 
          className='text-left text-foreground md:w-full md:justify-start'
          variant='light'
          onPress={ontagModalOpen}
          startContent={<TagsIcon className='text-primary-500'/>}
        >
          New Tag
        </Button>
      </div>

      <CreateLinkModal onOpenChange={onlinkModalOpenChange} isModalOpen={islinkModalOpen} />
      <CreateTagModal  onOpenChange={ontagModalOpenChange} isModalOpen={istagModalOpen}/>
    </div>
  )
}