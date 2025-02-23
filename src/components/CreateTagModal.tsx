import { createTag } from '@/server/actions/tag';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,Input, Form } from '@heroui/react';
import { FormEvent, ReactNode, useState } from 'react';
import { validateTag, ValidateTagErrors } from '@/schemas/validate-schemas';



function useCreateTagModal() {
  const [errors, setErrors] = useState({title: []} as ValidateTagErrors)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {success, errors} = validateTag(formData)

    if (!success) setErrors({...errors})
    else refreshErrors()

  try {
      setLoading(true)
      if (success) await createTag(formData)
    } catch (error) {
      console.error('ERROR WHEN SENDING DATA (TAG):', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  const iterateErrors = (errors: string[]): ReactNode => {
    return (
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )    
  }

  const refreshErrors = () => (setErrors({title: []}))
  const handleClose = ({onTagModalOpenChange}: {onTagModalOpenChange: () => void}) => {
    refreshErrors()
    onTagModalOpenChange()
  }

  return {errors, loading, onSubmit, iterateErrors, handleClose}
}

export function CreateTagModal ({isTagModalOpen, onTagModalOpenChange}: {isTagModalOpen: boolean, onTagModalOpenChange: () => void}) {
  const { errors, loading, iterateErrors, onSubmit, handleClose  } = useCreateTagModal()

  return (
    <Modal isOpen={isTagModalOpen} onOpenChange={()=> ( handleClose({onTagModalOpenChange}) )}>
      <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create tag</ModalHeader>
              <ModalBody>
                <Form onSubmit={onSubmit}>
                  <Input
                      errorMessage={errors.title.length > 0 ? iterateErrors(errors.title): undefined}
                      isInvalid={errors.title.length > 0}

                      color='primary'
                      variant='faded'

                      name='title'
                      label='Tag name'
                      placeholder='Tag'
                    />
                  <ModalFooter className='w-full'>
                    <Button color="danger" variant="light" type='button' onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type='submit' isLoading={loading}>
                      Action
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}