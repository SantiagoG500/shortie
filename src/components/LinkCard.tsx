'use client'

import { addToast, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Hash, Copy, Trash, Pencil } from 'lucide-react';
import { SelectLinks } from '@/db/db-schemas';
import { appDomain } from '@/routes';

interface LinkCardProps {
  linkData: SelectLinks,
  handleCurrentLink: (link: SelectLinks) => void,
  onDeleteModalOpen : () => void
  onEditModalOpen : () => void
}

export function LinkCard({linkData, handleCurrentLink, onDeleteModalOpen, onEditModalOpen}: LinkCardProps) {
  const {title, description, createdAt, url, slug, clicks} = linkData

  const formatedDate = new Date(createdAt)
    .toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', day: 'numeric'})

  return (
    <>
      <Card className='bg-default-50'>
        <CardHeader className='flex justify-between'>
          <h4 className='font-bold'>{title}</h4>
          <div className='flex gap-1'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              className='text-stone-300 hover:text-primary-500'
              onPress={() => {
                handleCurrentLink(linkData)
                onEditModalOpen()
              }}>
              <Pencil className='w-5 h-5'/>
            </Button>

            <Button
              isIconOnly
              variant='light'
              size='sm'
              className='text-stone-300 hover:text-danger-500'
              onPress={() => {
                handleCurrentLink(linkData)  
                onDeleteModalOpen()
              }}
            >
              <Trash className='w-5 h-5'/>
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          <p className='text-base line-clamp-2'>{description}</p>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-stone-300 hover:text-stone-400 truncate' title='original link'>{url}</span>
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly variant='light' size='sm'>
                  <Copy className='w-4 h-4 hover:text-primary-400'/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-min p-0'>
                <ButtonGroup>
                  <Button
                    className='text-primary-200 hover:text-primary-300 font-bold'
                    color='default'
                    value={url}
                    onPress={async () => {
                      await navigator.clipboard.writeText(url)
                      addToast({
                        title: 'Link copied to clipboard',
                        description: `${url}`,
                        color: 'success'
                      })
                    }}
                    >
                      Copy original link
                  </Button>
                  <Button
                    className='text-primary-200 hover:text-primary-300 font-bold'
                    color='default'
                    value={`${appDomain}/${slug}`}
                    onPress={async () => {
                      const redirectUrl= `${appDomain}${slug}`
                      await navigator.clipboard.writeText(redirectUrl)
                      addToast({
                        title: 'Link copied to clipboard',
                        description: `${redirectUrl}`,
                        color: 'success'
                      })
                    }}
                  >
                    Copy Shortened link
                  </Button>
                </ButtonGroup>
              </PopoverContent>
            </Popover>
          </div>
        </CardBody>

        <CardFooter className='flex justify-between'>
          <span className='text-sm'>{formatedDate}</span>
          <div className='flex items-center gap-1'>
            <Hash className='w-4 h-4'/>
            <span className='text-sm'>{clicks} Clicks</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )  
}