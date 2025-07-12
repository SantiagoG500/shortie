'use client'

import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Hash, Copy, Trash, Pencil, Clipboard, QrCodeIcon } from 'lucide-react';
import { appDomain } from '@/routes';
import { LinksAndTags } from '@/server/actions/link';

interface LinkCardProps {
  linkData: LinksAndTags,
  handleCurrentLink: (link: LinksAndTags) => void,
  onDeleteModalOpen: () => void,
  onEditModalOpen: () => void,
  onQrModalOpen:  () => void
}

export function LinkCard({linkData, handleCurrentLink, onDeleteModalOpen, onEditModalOpen, onQrModalOpen}: LinkCardProps) {
  const {title, description, createdAt, url, slug, clicks} = linkData

  const formatedDate = new Date(createdAt)
    .toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', day: 'numeric'})

  return (
    <>
      <Card className='bg-default-50/70 border border-default-200 hover:bg-default-100 hover:border-default-300 hover:text-primary'>
        <CardHeader className='flex justify-between'>
          <h4 className='font-bold'>{title}</h4>
          <div className='flex gap-1'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              className='hover:text-primary-500'
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
              className='hover:text-danger-500'
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
          <p className='text-base line-clamp-2 text-foreground'>{description}</p>
          <div className='flex items-center gap-2'>
            <span className='text-foreground hover:text-foreground/75 text-sm truncate' title='original link'>{url}</span>
              <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly className=' hover:text-primary-400' variant='light' size='sm'>
                      <Copy className='w-4 h-4'/>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" color='primary' variant='faded'>
                    <DropdownItem
                      key="copy-link"
                      startContent={<Clipboard/>}
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
                      Copy shortened link
                    </DropdownItem>
                    <DropdownItem
                      key="copy-qr"
                      startContent={<QrCodeIcon/>}
                      onPress={() => {
                        handleCurrentLink(linkData)
                        onQrModalOpen()
                      }}
                    >
                      Copy Qr code
                    </DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </div>
        </CardBody>

        <CardFooter className='flex justify-between'>
          <span className='text-foreground text-sm'>{formatedDate}</span>
          <div className='flex items-center gap-1'>
            <Hash className='w-4 h-4 text-foreground'/>
            <span className='text-foreground text-sm'>{clicks} Clicks</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )  
}