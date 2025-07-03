import { useDeleteAccount } from '@/hooks/useForms';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input, Form } from '@heroui/react';
import { Trash2 } from 'lucide-react';

interface DeleteAccountModalProps {
  email: string
  isOpen: boolean
  onOpenChange: () => void
}

export default function DeleteAccountModal({email, isOpen, onOpenChange}: DeleteAccountModalProps) {
  const { handleClose, handleSubmit, register, onSubmit, errors, isSubmitting } = useDeleteAccount({ onOpenChange, email })

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Account</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <p>Keep in mind that tis actions <b className='text-danger'>This action can't be undone.</b> All the data we have in our database will be deleted.</p>
                  <Input
                    {...register('email')}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email?.message}

                    label='Type your email to confirm'
                    placeholder={email}

                    color='danger'
                    variant='faded'
                  />

                  <ModalFooter className='w-full pr-0'>
                    <Button variant="ghost" type='button' onPress={handleClose} isLoading={isSubmitting}>
                      Close
                    </Button>
                    <Button color="danger" variant='ghost' type='submit' endContent={<Trash2 className='w-[18px] h-[18px]'/>} isLoading={isSubmitting}>
                      Delete my account
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
        </ModalContent>
      </Modal>
  )
}
