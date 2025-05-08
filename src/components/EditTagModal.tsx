import { SelectTags } from '@/db/db-schemas';
import { useEditTagForm } from '@/hooks/useForms';
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Selection } from '@heroui/react';
import { useState } from 'react';

interface EditTagModalProps {
  tags: SelectTags[]
  isModalOpen: boolean,
  onOpenChange: () => void,
}

export function EditTagModal({tags, isModalOpen, onOpenChange}: EditTagModalProps) {
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set(['']));
  const [ currentTag, setCurrentTag ] = useState<SelectTags>({
    title: '',
    id: '',
    userId: '',
  })
  
  const { handleClose, handleSubmit, register, onSubmit, errors, isSubmitting } = useEditTagForm({onOpenChange, tag: currentTag})
  
  return (
    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          Edit Tags
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Input
              {...register('title')}
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title?.message}

              isDisabled={!(currentTag.id.length > 0)}
              defaultValue={currentTag?.title}

              color='primary'
              variant='bordered'

              label={`Rename ${currentTag?.title || 'Tag'}`}
              placeholder='new name'
            />

            <Select
              label='select a tag'
              placeholder='Which tag you want to edit?'
              selectedKeys={selectedTags}
              selectionMode='single'

              color='primary'
              variant='bordered'
              
              onSelectionChange={(tagsSelection) => {
                const tagValue = tags.find(tag => tag.id === [...tagsSelection][0])
                console.log({tagsSelection, tagValue});

                if (tagValue) setCurrentTag(tagValue)
                else setCurrentTag({
                  title: '',
                  userId: '',
                  id: '',
                })

                setSelectedTags(tagsSelection)
              }}
            >
              {tags.map((tag) => (
                <SelectItem key={tag.id}>{tag.title}</SelectItem>
              ))}
            </Select>

            <ModalFooter className='w-full pr-0'>
              <Button size='sm' variant='bordered' type='button' onPress={handleClose}>
                Close
              </Button>
              <Button size='sm' color='primary' variant='bordered' type='submit' isLoading={isSubmitting}>
                Update
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
        
        
      </ModalContent>
    </Modal>
  )
}
