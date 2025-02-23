import { Button, Tooltip } from '@heroui/react'
import { Link2, Tag } from 'lucide-react'

interface AsideOptionsProps {
  onLinkModalOpen: () => void,
  onTagModalOpen: () => void
}

export function AsideOptions({onLinkModalOpen, onTagModalOpen}: AsideOptionsProps) {
  return (
    <div className='flex flex-nowrap md:flex-wrap md:w-full'>
        <Tooltip
            placement='top-start'
            showArrow={true}
            delay={5}
            content={<p>You can create a total of <b className='text-primary-400'>20 links</b></p>}
        >
          <Button
            className='text-foreground md:w-full md:justify-start'
            variant='light'
          >
            <span className=''> <span className='text-primary-500 font-bold'>20</span> Links left</span>
          </Button>
        </Tooltip>

        <Button 
          className='text-foreground md:w-full md:justify-start'
          variant='light'
          onPress={onLinkModalOpen}
          startContent={<Link2  className='h-4 w-4 text-primary-400'/>}
        >
            New LInk
        </Button>
        <Button 
          className='text-foreground md:w-full md:justify-start'
          variant='light'
          onPress={onTagModalOpen}
          startContent={<Tag  className='h-4 w-4 text-primary-400'/>}
        >
          New Tag
        </Button>
      </div>
  )
}