import { SelectLinks } from '@/db/db-schemas'
import { useLinkEditForm } from '@/hooks/useForms'
import { appDomain } from '@/routes'
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@heroui/react'
import { Dice5, LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import { Controller } from 'react-hook-form'

interface EditLinkModalProps {
  isModalOpen: boolean,
  onOpenChange: () => void,
  link: SelectLinks,
}
export function EditLinkModal({ isModalOpen, link, onOpenChange }: EditLinkModalProps) {
  const {
    handleSubmit,
    handleSlugEnable,
    handleClose,
    register,
    onSubmit,
    setSlug,
    watch,

    editSlug,
    control,
    errors,
    isSubmitting,
  } = useLinkEditForm({link, onOpenChange})
  
  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className='text-xl font-bold'>{link.title}</p>
                <p className='text-base font-normal text-default-500'>
                  {appDomain}{watch('slug') ?? link.slug}
                </p>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    color='primary' 
                    variant='bordered'
                    label='Link title'
                    placeholder={link.title}

                    {...register('title')}

                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                  <Input

                    color='primary'
                    variant='bordered'
                    label='Link description'
                    placeholder={link.description || ''}
                    
                    {...register('description')}

                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                  <Input

                    color='primary'
                    variant='bordered'
                    label='Destination link'
                    placeholder={link.url}

                    {...register('url')}

                    isInvalid={!!errors.url}
                    errorMessage={errors.url?.message}
                  />

                <div className='flex items-center gap-1 w-full'>
                  <Controller
                    name="slug"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}

                        value={field.value ?? ''}
                        color='primary'
                        variant='bordered'
                        label='Short Link slug'
                        placeholder={link.slug}

                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                        isDisabled={editSlug}
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
                      isDisabled={editSlug}
                    >
                       <Dice5 />
                    </Button>

                    <Tooltip content={
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">{editSlug ? 'unlock' : 'lock'} slug edition</div>
                        {editSlug
                          ? <div className="text-tiny">Be aware that this <b className='text-red-400'>will delete</b> the access to the preivous link</div>
                          : <div className="text-tiny">keep the current slug</div>
                        }
                      </div>
                    }>
                      <Button 
                        isIconOnly 
                        className='text-primary-300 hover:text-primary-500'
                        color="default" 
                        aria-label='randomize slug' 
                        type='button'
                        variant='bordered'
                        onPress={handleSlugEnable}
                      >
                          {editSlug? <LockKeyholeOpen/> : <LockKeyhole /> }
                      </Button>
                    </Tooltip>

                </div>
                  <ModalFooter className='w-full pr-0'>
                    <Button size='sm' variant='ghost' type='button' onPress={handleClose}>
                      Close
                    </Button>
                    <Button size='sm' variant='ghost' color='primary' type='submit' isLoading={isSubmitting}>
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