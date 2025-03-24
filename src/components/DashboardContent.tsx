'use client'

import { useDisclosure } from '@heroui/react'
import { useState } from 'react'

import { LinkCard } from './LinkCard'
import { DeleteLinkModal } from './DeleteLinkModal'
import { SelectLinks } from '@/db/db-schemas'
import { EditLinkModal } from './EditLinkModal'


export function DashboardContent({ links }: {links: SelectLinks[]}) { 
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

  const [currentLink, setCurrentLink] = useState<SelectLinks>({
    title: '',
    id: '',
    userId: '',
    description: '',
    createdAt: '',
    recentClick: '',
    clicks: 0,
    slug: '',
    url: '',
  })

  const handleCurrentLink = (newLink: SelectLinks) => { setCurrentLink(newLink) }

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
        link={currentLink}
        isModalOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
      />
    </>
  )
}