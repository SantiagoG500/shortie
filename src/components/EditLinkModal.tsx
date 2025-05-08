import { MAX_TAGS_PER_LINK } from '@/constants'
import { SelectTags } from '@/db/db-schemas'
import { useLinkEditForm } from '@/hooks/useForms'
import { appDomain } from '@/routes'
import { LinksAndTags } from '@/server/actions/link'
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, Selection, SelectItem, Tooltip } from '@heroui/react'
import { Dice5, LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import { Controller } from 'react-hook-form'

interface EditLinkModalProps {
  isModalOpen: boolean,
  onOpenChange: () => void,
  link: LinksAndTags,
  tags: SelectTags[]
}
export function EditLinkModal({ isModalOpen, link, tags, onOpenChange }: EditLinkModalProps) {
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
  } = useLinkEditForm({
      link,
      userTags: tags.map((tag) => tag.id),
      previousTags: link.tags,
      onOpenChange
    })
  
  const defaultTags = link.tags  
  
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

                  <Controller
                    name='selectedTags'
                    control={control}
                    
                    defaultValue={new Set(defaultTags)}
                    render={({ field, fieldState }) => (
                      <Select
                        label='Tags'
                        placeholder='Select a tags'
                        color='primary'
                        variant='bordered'
                        selectionMode='multiple'
                        aria-label='search by tag'
  
                        errorMessage={fieldState.error?.message}
                        isInvalid={Boolean(fieldState.error)}
  
                        disabled={tags.length === 0}
                        selectedKeys={field.value || new Set()}

                        onSelectionChange={(selection: Selection) => {
                          const newSelection = new Set(
                            Array.from(selection).filter((value): value is string => value !== undefined )
                          )
                          if (newSelection.size <= MAX_TAGS_PER_LINK) {
                            field.onChange(newSelection)
                          }
  
                        }}
                      >
                        {tags.map(tag => (
                         <SelectItem key={tag.id} color='primary' variant='faded'>
                            {tag.title}
                         </SelectItem> 
                        ))}
                      </Select>
                    )}
                  />

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