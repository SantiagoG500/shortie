import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Input, Form, Select, SelectItem, Selection, SharedSelection } from '@heroui/react';
import { Dice5 } from 'lucide-react';
import { useLinkForm } from '@/hooks/useForms';
import { Controller } from 'react-hook-form';
import { SelectTags } from '@/db/db-schemas';
import { useState } from 'react';
import { MAX_TAGS_PER_LINK } from '@/constants';

interface CreateLinkModalProps {
  isModalOpen: boolean,
  onOpenChange: () => void,
  tags: SelectTags[]
}

export function CreateLinkModal({isModalOpen, onOpenChange, tags}: CreateLinkModalProps) {
  const {
    handleClose,
    handleSubmit,
    register,
    onSubmit,
    setSlug,

    control,
    errors,
    isSubmitting
  } = useLinkForm({onOpenChange})
  const [ selectedTags, setSelectedTags ] = useState<Set<string>>(new Set([]))

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
                    <Dice5 />
                  </Button>
                </div>

                <Controller
                  name='selectedTags'
                  control={control}
                  defaultValue={selectedTags}
                  render={({ field, fieldState }) => (
                    <Select
                      label='Tags'
                      placeholder='Select a tag'
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
                          setSelectedTags(newSelection)
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