'use client'

import { useDisclosure } from '@heroui/react'
import { useState } from 'react'

import { LinkCard } from './LinkCard'
import { DeleteLinkModal } from './DeleteLinkModal'
import { SelectLinks, SelectTags } from '@/db/db-schemas'
import { EditLinkModal } from './EditLinkModal'
import { LinksAndTags } from '@/server/actions/link'


export function DashboardContent({ links, tags }: {links: LinksAndTags[], tags: SelectTags[]}) { 
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange
  } = useDisclosure()
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange
  } = useDisclosure()

  // Used to let the edit modal know which link was selected
  const [currentLink, setCurrentLink] = useState<LinksAndTags>({
    title: '',
    id: '',
    userId: '',
    description: '',
    createdAt: '',
    recentClick: '',
    clicks: 0,
    slug: '',
    url: '',
    tags: []
  })

  const handleCurrentLink = (newLink: LinksAndTags) => { setCurrentLink(newLink) }

  return (
    <>
      {
        links && links.map( (value, index) => {
          return (
            <LinkCard key={index} linkData={{
                ...value,
                clicks: value.clicks ?? 0,
                recentClick: value.recentClick ?? '',
                description: value.description ?? ''
              }}
              handleCurrentLink={handleCurrentLink}
              onDeleteModalOpen={onDeleteModalOpen}
              onEditModalOpen={onEditModalOpen}
            />
          )
        })
      }
      <DeleteLinkModal
        link={currentLink}
        isModalOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
      />
      <EditLinkModal
        tags={tags}
        link={currentLink}
        isModalOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
      />
    </>
  )
}