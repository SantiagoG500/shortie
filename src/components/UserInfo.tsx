'use client'
import { Avatar } from '@heroui/react';

interface UserInfoProps {
  userName: string
  email: string
  avatarImg: string
}

export function UserInfo({userName, email, avatarImg}: UserInfoProps) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Avatar
        src={avatarImg}
        name={userName}
        size='lg'
      />
      <div className='flex flex-col text-center mt-4'>
        <p className='text-lg font-bold'>{userName}</p>
        <p className='text-foreground/70'>{email}</p>
      </div>
    </div>
  )
}