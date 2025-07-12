import { SelectLinks, SelectTags } from '@/db/db-schemas';
import { appDomain } from '@/routes';
import { CreateLinkSchema, CreateTagSchema, DeleteAccountSchema, DeleteLinkSchema, DeleteTagSchema, EditLinkSchema } from '@/schemas/schema';
import { createLink, deleteLink, LinksAndTags, updateLink } from '@/server/actions/link';
import { addTags, createTag, deleteTag, updateLinksTags, updateTag } from '@/server/actions/tag';
import { deleteUser } from '@/server/actions/user';
import { generateCUID2 } from '@/utils/cuid2';
import { addToast, PressEvent } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
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
      const { selectedTags } =  data
      const requestResult = await createLink(data)
  
      if (!requestResult.success) {
          addToast({
            title: 'Submission error',
            description: requestResult.error,
            color: 'danger'
          })
  
          return
      }
      if (selectedTags && selectedTags.size > 0 && requestResult.linkId) {        
        const tags = Array.from(selectedTags)
        const { error, success } = await addTags({ tags, linkId: requestResult.linkId })

        if (!success) {
          addToast({
            title: 'Error adding tags',
            color: 'danger',
            description: error
          })
        }
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
          title: 'Deletion Error',
          description: requestResult.error
        }) 

        return
      }
      
      addToast({
        title: `${link.title} eliminated`,
        description: `Link eliminated: ${link.url}`,
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
  link: LinksAndTags,
  previousTags: string[],
  userTags: string[]
}
export function useLinkEditForm({onOpenChange, link, userTags, previousTags}: useLinkEditFormProps) {
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
      const { selectedTags } = data

      const objToArray = Object.entries(data)
      const filteredFields = objToArray.filter(field => field[1])
      
      if (filteredFields.length > 0) {
        await updateLink({
          linkData: link,
          newLinkData: Object.fromEntries(filteredFields)
        })

        handleClose()
      }
      

      if (selectedTags && selectedTags.size > 0) {       
        if (selectedTags) {
          console.log('edit tags');
          
          const { error, success } = await updateLinksTags({
            linkId: link.id,
            newTags: Array.from(selectedTags),
            prevTags: previousTags    
          })

          if (!success) addToast({
            title: 'Update failed',
            description: error,
            color: 'danger'
          })
          
        } else {
          const { error, success } = await addTags({
            linkId: link.id,
            tags: Array.from(selectedTags)
          })

          if (!success) addToast({
            title: 'Addition failed',
            description: error,
            color: 'danger'
          })
        }
      }
      
      addToast({
        title: 'Link edited asfasdf succesfuly!!',
        description: `Link updated: ${link.title}`,
        color: 'success'
      })
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

type UseEditTagFormProps = BaseUseFormType & {
  tag: SelectTags
}
export function useEditTagForm({onOpenChange, tag}: UseEditTagFormProps) {
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
      const {success, error} = await updateTag({tagData: tag, newTagData: data})
      
      if (!success) {
        addToast({
          title: 'Update tag failed',
          description: `The tag "${tag.title}" was not updated succesfully`,
          color:'danger',
        })
      }
      
      addToast({
        title: 'Tag Updated succesfully',
        description: `The tag previously called "${tag.title}" was renamed to: ${data.title}`,
        color:'success',
      })

      handleClose()
    } catch (error) {
      addToast({
        title: 'Something went wrong',
        description: 'We were not able to update this tag, try again later'
      })
    } finally {
      handleClose()
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange()
  }


  return { register, handleSubmit, handleClose, onSubmit, errors, isSubmitting }
}



type useDeleteTagFormProps = BaseUseFormType & {
  tag: SelectTags
}
export function useDeleteTagForm({onOpenChange, tag}: useDeleteTagFormProps) {
  const form = useForm<z.infer<typeof DeleteTagSchema>>({
    resolver: zodResolver(DeleteTagSchema),
    defaultValues:{ title: '' }
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = form


  const onSubmit = async (data: z.infer<typeof DeleteTagSchema>) => {
    try {
      if (!(data.title.length > 0) || !(tag.id.length > 0)) {
        addToast({
          title: 'Delete tag failed',
          description: "You didn't provide a tag somehow, refresh the page or try again later"
        })
      }

      const {success, error} = await deleteTag({tag})
      
      if (!success) {
        console.error(error);
        
        addToast({
          title: 'Delete tag failed',
          description: error,
          color:'danger',
        })
      }
      
      addToast({
        title: 'Tag Deleted succesfully',
        description: `Tag eliminated: ${tag.title}`,
        color:'success',
      })

    } catch (error) {
      addToast({
        title: 'Something went wrong',
        description: 'We were not able to delete this tag, try again later'
      })
    } finally {
      onOpenChange()
    }
  }

  return { register, handleSubmit, onSubmit, isSubmitting, errors }
}

type useDeleteAccountProps =  BaseUseFormType & { email: string }
export function useDeleteAccount({ onOpenChange, email }: useDeleteAccountProps) {
 const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues:{ confirmEmail: email }
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
    setValue('confirmEmail', email)
  }, [setValue, email])
  
  const onSubmit = async (data: z.infer<typeof DeleteAccountSchema>) => {
    try {
      // ACCOUNT DELETION LOGIC
      if (data.email.length === 0) {
        addToast({ 
          title: 'Delete Account failed',
          description: "You didn't provide email confirmation to delete your user account"
        })
        
        return
      }
      const { error, success } = await deleteUser()
      
      if (!success) {
        addToast({
          title: 'Delete Account failed',
          description: error
        })
      }

      await signOut()
      
      console.log('ONSUBMIT');
    } catch (error) {
      console.log('ONSUBMIT ERROR: ', error)
      
    } finally {
      handleClose()
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange()
  }

  return { register, handleSubmit, handleClose, onSubmit, isSubmitting, errors }
}
