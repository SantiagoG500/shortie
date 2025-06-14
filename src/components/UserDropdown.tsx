import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@heroui/react';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import NextLink from "next/link";


async function handleSignOut () { 
  await signOut({
    redirectTo: '/'
  })
}

export default function UserDropdown({ userImg, name }: { userImg: string | undefined, name: string}) {
  return (
    <>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar name={name} src={userImg} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="faded" color='primary'>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p>Signed in as</p>
              <p className="font-bold text-primary-500">{name}</p>
            </DropdownItem>
            <DropdownItem
              className='text-left'
              key="account"
              startContent={
                <User className='w-5 h-5'/>
              }
            >
              My Account
            </DropdownItem>
            <DropdownItem
              className='text-left'
              key="logout"
              color="danger"
              startContent={
                <LogOut className='w-5 h-5'/>
              }
              onPress={handleSignOut}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

    </>
  )
}