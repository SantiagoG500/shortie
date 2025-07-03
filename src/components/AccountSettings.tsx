'use client'

import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react'
import { Trash2 } from 'lucide-react'
import DeleteAccountModal from './auth/DeleteAccountModal'

export function AccountSettings({ email }: { email: string }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <>
      <Card>
        <CardHeader>
          <div>
            <p className='text-xl font-bold'>Account Settings</p>
            <p className='text-foreground/70'>Update you account settings</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className='flex flex-col gap-2'>
            <section>
              <div className='flex items-center gap-1 mb-2 font-semibold'>
                <p>Delete Account: </p>
              </div>
              <Button
                color='danger'
                endContent={<Trash2 className='w-[18px] h-[18px]'/>}
                size='sm'
                variant='faded'
                onPress={onOpen}
              >
                Delete account
              </Button>
            </section>
          </div>
        </CardBody>
      </Card>

      <DeleteAccountModal
        email={email}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}