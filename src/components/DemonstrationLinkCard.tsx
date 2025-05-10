'use client'

import { appDomain } from '@/routes';
import { addToast, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Copy } from 'lucide-react';

interface LinkCardProps {
    title: string;
    id: string;
    slug: string;
    description: string | null;
    url: string;
    createdAt: string;
    clicks: number | null;
    recentClick: string | null;
}

interface DemonstrationLinkCardProps {
  linkData: LinkCardProps;
}

export function DemonstrationLinkCard({ linkData }: DemonstrationLinkCardProps) {
  const {title, description, createdAt, url, slug, clicks} = linkData
  const formatedDate = new Date(createdAt)
    .toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', day: 'numeric'})

   return (
    <>
      <Card className='bg-default-50/70 border border-default-200 hover:bg-default-100 hover:border-default-300 hover:text-primary w-full max-w-md'>
        <CardHeader className='flex justify-between'>
          <h4 className='font-bold'>{title}</h4>
        </CardHeader>

        <CardBody>
          <p className='text-base line-clamp-2 text-foreground'>{description}</p>
          <div className='flex items-center gap-2'>
            <span className='text-foreground hover:text-foreground/75 text-sm truncate' title='original link'>{url}</span>
            <Popover color='primary'>
              <PopoverTrigger>
                <Button isIconOnly className=' hover:text-primary-400' variant='light' size='sm'>
                  <Copy className='w-4 h-4'/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-min p-0'>
                <ButtonGroup>
                  <Button
                    className='text-primary hover:text-primary-400 font-bold'
                    onPress={async () => {
                      await navigator.clipboard.writeText(url)
                      addToast({
                        title: 'Link copied to clipboard',
                        description: `${url}`,
                        color: 'success'
                      })
                    }}
                    value={url}
                    >
                      Copy original link
                  </Button>
                  <Button
                    className='text-primary hover:text-primary-400 font-bold'
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
          <span className='text-foreground text-sm'>{formatedDate}</span>
        </CardFooter>
      </Card>
    </>
  )  
}