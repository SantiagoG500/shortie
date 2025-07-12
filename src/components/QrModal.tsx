'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Download, Clipboard } from 'lucide-react';
import { SelectLinks } from '@/db/db-schemas';
import { useQR } from '@/hooks/useQR';

interface QrModalProps {
  isModalOpen: boolean,
  onOpenChange: () => void,
  link: SelectLinks
}

export default function QrModal({ isModalOpen, onOpenChange, link }: QrModalProps) {
  const { handleCopy, handleDownload, startTransition, isPending, qrRef } = useQR({ link, isModalOpen })

  return (
    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} size='xs'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Share qr code</ModalHeader>
            <ModalBody className='flex justify-center'>
                <div  className='flex justify-center'>
                  {/* QR conde container */}
                  <div ref={qrRef}/>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button size='sm' variant='ghost' onPress={onClose}>
                Close
              </Button>
              <Button
                size='sm'
                color="primary"
                variant='ghost'
                onPress={()=> {
                  handleDownload()
                  onClose()
                }}
                startContent={<Download className='w-4 h-4'/>}
              >
                Download
              </Button>
              <Button
                size='sm'
                color="primary"
                variant='ghost'
                onPress={()=> {
                  startTransition(async () => {
                    handleCopy()
                    onClose()
                  })
                }}
                isLoading={isPending}
                startContent={!isPending && <Clipboard className='w-4 h-4'/>}
              >
                Copy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
