'use client'
import { AuthForm } from '@/components/AuthForm'
import { Card, CardBody } from '@heroui/react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to shortie'
}

export default function Auth() {
  return (
    <div className='h-5/6 flex justify-center items-center'>

      <Card className='w-9/12 max-w-96 p-6'>
        <CardBody>
          <div className='w-full mb-4'>
            <h1 className='text-center text-2xl mb-1 font-bold'>Welcome to shortie</h1>
            <p className='text-center'>Please sign in to continue</p>
          </div>

          <AuthForm/>
        </CardBody>
      </Card>
    </div>
  )

}