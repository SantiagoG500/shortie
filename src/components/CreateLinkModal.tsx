import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Input, Form } from '@heroui/react';
import { Dice5 } from 'lucide-react';
import { useLinkForm } from '@/hooks/useForms';
import { Controller } from 'react-hook-form';

interface CreateLinkModalProps {
  isModalOpen: boolean,
  onOpenChange: () => void
}

export function CreateLinkModal({isModalOpen, onOpenChange}: CreateLinkModalProps) {
  const { handleClose, handleSubmit, register, onSubmit, setSlug, control, errors, isSubmitting } = useLinkForm({onOpenChange})


  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Create New Link</ModalHeader>
            <ModalBody> 
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  color='primary' 
                  variant='bordered'
                  {...register('title')}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                  label='Link title'
                  placeholder='Title'
                />
                <Input
                  color='primary'
                  variant='bordered'
                  {...register('description')}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  label='Link description'
                  placeholder='Description'
                />
                <Input
                  color='primary'
                  variant='bordered'
                  {...register('url')}
                  isInvalid={!!errors.url}
                  errorMessage={errors.url?.message}
                  label='Destination link'
                  placeholder='https://www.website.com'
                />

              <div className='flex items-center gap-1 w-full'>
                <Controller
                  name="slug"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      color='primary'
                      variant='bordered'
                      {...field}
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                      label='Short Link slug'
                      placeholder='hq66mgy'
                    />
                  )}
                />
                <Button 
                  isIconOnly 
                  className='text-primary-300 hover:text-primary-500'
                  color="default" 
                  aria-label='randomize slug' 
                  type='button'
                  variant='bordered'
                  onPress={setSlug}
                >
                  {/* <Dice5 className='text-primary-300'/> */}
                  <Dice5 />
                </Button>
              </div>

                <ModalFooter className='w-full pr-0'>
                  <Button 
                    size="sm"
                    onPress={handleClose} 
                    type='button'
                    variant='ghost'
                    isLoading={isSubmitting}
                  >
                    Close
                  </Button>
                  <Button 
                    size="sm"
                    color="primary" 
                    type='submit'
                    variant='ghost'
                    isLoading={isSubmitting}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </Form>
            </ModalBody>
          </>
      </ModalContent>
    </Modal>
  );
}