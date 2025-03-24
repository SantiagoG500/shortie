import { SelectLinks } from '@/db/db-schemas'
import { useLinkDeleteForm } from '@/hooks/useForms'
import { Form, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from '@heroui/react'

interface DeleteLinkModalProps {
  isModalOpen: boolean,
  onOpenChange : () => void,
  link: SelectLinks
}
export function DeleteLinkModal({isModalOpen, onOpenChange, link }: DeleteLinkModalProps) {
  const { handleClose, handleSubmit, register, onSubmit, errors, isSubmitting } = useLinkDeleteForm({onOpenChange, link})

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
          <ModalHeader><p>Delete <b>{link.title}</b></p> </ModalHeader>
          <ModalBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register('title')}
                  color='danger'
                  variant='bordered'
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}

                  labelPlacement='outside'
                  label={<p>Type <b>{link.title}</b> to delete</p>} 
                  placeholder={link.title}
                />
              <ModalFooter className='w-full p-2'>
                <Button
                  type='button' size='sm' variant='ghost' isLoading={isSubmitting} onPress={handleClose}>Cancel</Button> 
                <Button
                  type='submit' size='sm' variant='ghost' color='danger' isLoading={isSubmitting}>Delete</Button> 
              </ModalFooter>
              </Form>
          </ModalBody>
      </ModalContent>
    </Modal>
  ) 
}