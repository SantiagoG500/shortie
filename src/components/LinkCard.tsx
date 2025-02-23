import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Hash, Clipboard, Settings, Search, Plus, Tags, Link, Copy, Trash } from 'lucide-react';


interface LinkCardProps {
  title: string,
  description: string,
  originalLink: string,
  shortenedLink: string,
  date: string,
  clicks: number,
}

export function LinkCard({title, description, originalLink, shortenedLink, date, clicks}: LinkCardProps) {
  return (
    <Card className='bg-stone-900'>
      <CardHeader className='flex justify-between'>
        <h4 className='font-bold'>{title}</h4>
        <div className='flex gap-2'>
          <Settings className='w-5 h-5 text-stone-300 hover:text-stone-500'/>
          <Trash className='w-5 h-5 text-stone-300 hover:text-stone-500'/>
        </div>
      </CardHeader>

      <CardBody>
        <h5 className=''>{description}</h5>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-stone-300 hover:text-stone-400 truncate' title='https://www.youtube.com/watch?v=8eQjSQAVlwos'>{originalLink}</span>
          <Popover>
            <PopoverTrigger>
              <div>
                <i data-lucide="phone" aria-hidden="true"></i>
                <Copy className='w-4 h-4 hover:text-stone-400'/>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-min p-0'>
              <ButtonGroup>
                <Button color='primary' value={originalLink}>Copy original link</Button>
                <Button color='primary' value={shortenedLink}>Copy Shortened link</Button>
              </ButtonGroup>
            </PopoverContent>
          </Popover>
        </div>
      </CardBody>

      <CardFooter className='flex justify-between'>
        <span className='text-sm'>{date}</span>
        <div className='flex items-center gap-1'>
          <Hash className='w-4 h-4'/>
          <span className='text-sm'>{clicks} Clicks</span>
        </div>
      </CardFooter>
    </Card>
  )  
}