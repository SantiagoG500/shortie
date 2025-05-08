'use client'
import { Card, CardHeader, User } from '@heroui/react';
import { SignOutButton } from './SignOutButton';

interface UserInfoProps {
  userName: string
  email: string
  avatarImg: string
}

export function UserInfo({userName, email, avatarImg}: UserInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <User
            avatarProps={{
              src: avatarImg
            }}
            description={email}
            name={userName}
          />
        </div>
        <SignOutButton/>
      </CardHeader>
    </Card>
  )
}