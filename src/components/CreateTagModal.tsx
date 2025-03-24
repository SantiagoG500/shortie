import { createTag } from '@/server/actions/tag';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,Input, Form } from '@heroui/react';
import { useTagForm } from '@/hooks/useForms';

type CreateTagModalProps = {
  isModalOpen: boolean,
  onOpenChange: () => void
}

export function CreateTagModal ({isModalOpen, onOpenChange}: CreateTagModalProps) {
  const { handleClose, handleSubmit, register, onSubmit, errors, isSubmitting } = useTagForm({onOpenChange})

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">Create tag</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                      {...register('title')}
                      errorMessage={errors.title?.message}
                      isInvalid={!!errors.title?.message}

                      color='primary'
                      variant='bordered'
                      

                      name='title'
                      label='Tag name'
                      placeholder='Tag'
                    />
                  <ModalFooter className='w-full pr-0'>
                    <Button size='sm' variant='bordered' type='button' onPress={handleClose}>
                      Close
                    </Button>
                    <Button size='sm' color='primary' variant='bordered' type='submit'  isLoading={isSubmitting}>
                      Action
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
        </ModalContent>
    </Modal>
  )
}