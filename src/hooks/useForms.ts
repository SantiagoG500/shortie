
import { SelectLinks } from '@/db/db-schemas';
import { appDomain } from '@/routes';
import { CreateLinkSchema, CreateTagSchema, DeleteLinkSchema, EditLinkSchema } from '@/schemas/schema';
import { createLink, deleteLink, getLink, updateLink } from '@/server/actions/link';
import { createTag } from '@/server/actions/tag';
import { generateCUID2 } from '@/utils/cuid2';
import { addToast, PressEvent, useDateInput } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type BaseUseFormType = {
  onOpenChange: () => void
}

export function useLinkForm({onOpenChange}: BaseUseFormType) {
  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      url: ''
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = form;

  const onSubmit = async (data: CreateLinkSchema) => {
    try {
      const requestResult = await createLink(data)
      
      if (!requestResult.success) {
        addToast({
          title: 'Submission error',
          description: requestResult.error,
          color: 'danger'
        })

        return
      }
      
      addToast({
        title: 'New link created',
        description: `New link: ${appDomain}${data.slug}`,
        color: 'success'
      })
    } catch (error) {
      console.error(error);
    } finally { 
      handleClose()
    }
  };

  const setSlug = async (e: PressEvent) => {
    const newSlug =  generateCUID2(7)
    console.log({newSlug, e});
    
    form.setValue('slug', newSlug)
  }
  
  const handleClose = () => {
    reset();
    onOpenChange();
  };

  return {
    register, 
    handleSubmit, 
    handleClose,
    onSubmit,
    setSlug,
    control,
    errors,
    isSubmitting
  }
}

export function useTagForm ({onOpenChange}: BaseUseFormType) {
  const form = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues:{ title: '' }
  })
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = form

  const onSubmit = async (data: z.infer<typeof CreateTagSchema>) => {
    try {
      // Implement logic
      const requestResult = await createTag(data)
      
      if (!requestResult.success) {
        addToast({
          title: 'Submission error',
          description: requestResult.error,
          color: 'danger'
        })
        return
      }

      addToast({
        title: 'New tag created',
        description: `${data.title} tag created`,
        color: 'success'
      })

      handleClose()
    } catch (error) {
      console.error();
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange()
  }

  return { register, handleSubmit, handleClose, onSubmit, errors, isSubmitting}
}

type useLinkDeleteFormProps = BaseUseFormType & {
  link: SelectLinks
}

export function useLinkDeleteForm ({onOpenChange, link}: useLinkDeleteFormProps) {
  const form = useForm<z.infer<typeof DeleteLinkSchema>>({
    resolver: zodResolver(DeleteLinkSchema),
    defaultValues: {
      title: '',
      confirmTitle: link.title
    }
  })
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    setValue,
    watch,
    control
  } = form
  
  useEffect(() => {
    setValue('confirmTitle', link.title)
  }, [setValue, link.title])
  
  const onSubmit = async (data: z.infer<typeof DeleteLinkSchema>) => {
    try {
      const requestResult = await deleteLink(link)
      if (!requestResult.success) {
        addToast({
          title: 'Submition Error',
          description: requestResult.error
        }) 

        return
      }
      
      addToast({
        title: `${link.title} eliminated`,
        description: `Link eliminared: ${link.url}`,
        color: 'success'
      })
    } catch (error) {
      console.error('LINK DELETION ERROR: ', error);
    }finally {
      handleClose()
    }
  }


  const handleClose = () => {
    reset()
    onOpenChange()
  }

  return { register, handleSubmit, handleClose, onSubmit, errors, isSubmitting }
}

type useLinkEditFormProps = BaseUseFormType & {
  onOpenChange: () => void,
  link: SelectLinks
}
export function useLinkEditForm({onOpenChange, link}: useLinkEditFormProps) {
  const [editSlug, setEditSlug] = useState(true)

  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    shouldUnregister: true,
    defaultValues: {
      title: link.title || undefined,
      slug: undefined,
      description: link.description || undefined,
      url: link.url  || undefined,
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = form;

  const onSubmit = async (data: EditLinkSchema)  => {
    try {
      const objToArray = Object.entries(data)
      const filteredFields = objToArray.filter(field => field[1])

      console.log('onSubmit hook', {data, filteredFields, length: filteredFields.length});

      if (filteredFields.length > 0) {
        console.log('inside if statement');
        
        await updateLink({
          linkData: link,
          newLinkData: Object.fromEntries(filteredFields)
        })

        addToast({
          title: 'Link edited succesfuly!!',
          description: `Link updated: ${link.title}`,
          color: 'success'
        })

        handleClose()
      }
        
        
    } catch (error) {
      console.error(error);
      addToast({
        title: 'Something went wrong',
        description: 'We were not able to update this link, try again later'
      })
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange()
    handleSlugEnable()
  }

  const setSlug = async (e: PressEvent) => {
    const newSlug =  generateCUID2(7)
    form.setValue('slug', newSlug)
  }

  const handleSlugEnable = () => {
    console.log({slugDisabled: editSlug});
    if (!editSlug) {
      form.setValue('slug', '')
      form.setValue('slug', undefined)
    }

    setEditSlug(prev => !prev)
  }

  return {
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
    isSubmitting    
  }
}
