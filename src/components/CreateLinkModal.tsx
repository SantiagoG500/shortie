import { validateLink, ValidateLinkErrors } from '@/schemas/validate-schemas';
import { createLink  } from '@/server/actions/link';
import { generateCUID2 } from '@/utils/cuid2';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Input, Form } from '@heroui/react';
import { Dice5 } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';

function useCreateLinkModal() {
  const [errors, setErrors] = useState({title: [], description: [], url: [], slug: []} as ValidateLinkErrors)
  const [randomCode, setRandomCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRandomCode = (val?: string) => {
    if (val) setRandomCode(val)
    else {
      const newCode = generateCUID2(7)
      setRandomCode(newCode)
    }
  }

  const onSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()  
    const formData = new FormData(e.currentTarget)
    const {errors, success} = validateLink(formData)

    if (!success) setErrors({...errors})
    else refreshErrors()

    try {
      setLoading(true)
      console.log('validation succesful', {loading});
      if (success) await createLink(formData)
    } catch (error) {
      console.error('ERROR WHEN DATA (LINK):', error)
    } finally {
      setLoading(false)
    }
  } 

  const iterateErrors = (errors: string[]): ReactNode => {
    return(
      <ul>
        {errors.map( (error, i) => (
          <li key={i}>{error}</li>
        ) )}
      </ul>
    )
  }
  const refreshErrors = () => ( setErrors({title: [], description: [], url: [], slug: []}) )
  const handleClose = ({onLinkModalOpenChange}: {onLinkModalOpenChange: () => void}) => {
    refreshErrors()
    onLinkModalOpenChange()
  }

  return {errors, randomCode, loading, onSumbit, iterateErrors, handleClose, handleRandomCode}
}
interface CreateLinkModalProps {
  isLinkModalOpen: boolean,
  onLinkModalOpenChange: () => void
}
export function CreateLinkModal({isLinkModalOpen, onLinkModalOpenChange}: CreateLinkModalProps) {
  const {errors, randomCode, loading ,onSumbit, iterateErrors, handleClose, handleRandomCode } = useCreateLinkModal()

  return (
    <Modal isOpen={isLinkModalOpen} onOpenChange={() => ( handleClose({onLinkModalOpenChange}) )}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <Form onSubmit={onSumbit}>
              <Input
                errorMessage={errors.title.length > 0 ? iterateErrors(errors.title) : undefined}
                isInvalid={errors.title.length > 0}

                color='primary'
                variant='faded'
                
                name='title'
                label='Link title'
                placeholder='Title'
              />
              <Input
                errorMessage={errors.description.length > 0 ? iterateErrors(errors.description) : undefined}
                isInvalid={errors.description.length > 0}

                color='primary'
                variant='faded'
                
                name='description'
                label='Link description'
                placeholder='Description'
              />
              
              <Input
                errorMessage={errors.url.length > 0 ? iterateErrors(errors.url) : undefined}
                isInvalid={errors.url.length > 0}
                
                color='primary'
                variant='faded'

                name='url'
                label='Destination link'
                placeholder='https://www.website.com'
              />
              <div className='flex items-center gap-1 w-full'>
                <Input
                  errorMessage={errors.slug.length > 0 ? iterateErrors(errors.slug) : undefined}
                  isInvalid={errors.slug.length > 0}
                  onChange={e => handleRandomCode(e.target.value)}
                  value={randomCode}
                  
                  color='primary'
                  variant='faded'
                  className=''

                  name='slug'
                  label='Short Link slug'
                  placeholder=' hq66mgy'
                />
                <Button 
                  isIconOnly 
                  color="primary" 
                  aria-label='randomize slug' 
                  type='button' 
                  onPress={() => handleRandomCode()} 
                  value={randomCode}
                >
                  <Dice5/>
                </Button>
              </div>
              <ModalFooter className='w-full'>
                <Button color="danger" variant="light" onPress={onClose} type='button'>
                  Close
                </Button>
                <Button color="primary"  type='submit' isLoading={loading}>
                  Create
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