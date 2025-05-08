import { SelectTags } from '@/db/db-schemas';
import { useDeleteTagForm } from '@/hooks/useForms';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, Selection, Form, SelectItem } from '@heroui/react';
import { useState } from 'react';

interface DeleteTagModalProps  {
  tags: SelectTags[],
  isModalOpen: boolean,
  onOpenChange: () => void,
}

export function DeleteTagModal({tags, isModalOpen, onOpenChange}: DeleteTagModalProps) {
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set(['']));
  const [ currentTag, setCurrentTag ] = useState<SelectTags>({ title: '', id: '', userId: ''})

  const { handleSubmit, register, onSubmit, isSubmitting, errors } = useDeleteTagForm({ tag: currentTag, onOpenChange})

  const resetStates = () => {
    setSelectedTags(new Set(['']))
    setCurrentTag({ title: '', id: '', userId: '' })
  }
  
  const handleClose = () => {
    resetStates()
    onOpenChange()
  }

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
    <ModalContent>
      <ModalHeader>
          Edit Tags
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Select
            {...register('title')}
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title?.message}

            selectedKeys={selectedTags}

            label='select a tag'
            placeholder='Which tag you want to edit?'

            selectionMode='single'
            color='danger'
            variant='bordered'

            onSelectionChange={(tagsSelection) => {
              const tagValue = tags.find(tag => tag.id === [...tagsSelection][0])

              if (tagValue) setCurrentTag(tagValue)
              else resetStates()

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
            <Button size='sm' color='danger' variant='bordered' type='submit' isLoading={isSubmitting} isDisabled={!(currentTag.id.length > 0)} >
              Delete
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
      
      
    </ModalContent>
  </Modal>
 ) 

}