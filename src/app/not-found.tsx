'use client'

import { Link, button as buttonStyles } from "@heroui/react";
import NextLink from 'next/link';


export default function NotFound() {

  return (
    <>
      <header className='flex flex-col items-center mt-14 pl-4 pr-4'>
        <section className='flex flex-col items-center text-center'>
          <h1 className='text-4xl font-bold tracking-tight inline from-danger-300 to-danger-600 bg-clip-text text-transparent bg-gradient-to-bl'>
            This is not fine
          </h1>
          <p className='text-default-700/90'>Something went wrong, <b>this page does not exist!</b></p>
        </section>

        <div className='
            mt-5
            bg-slate-500
            aspect-video
            rounded-xl
            overflow-hidden'
        >
          <img
            className='object-cover object-center'
            src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGZjZm95ajVvamZyazhlaGJrZnNkczB1aXoxNnB2dmVrM2hudG50ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NTur7XlVDUdqM/giphy.gif'
            alt='This is fine dog GIF'
          />
        </div>


        <Link
          href='/'
          as={NextLink}
          className={buttonStyles({
            color: 'danger',
            radius: 'full',
            variant: 'light',
            className: 'mt-4 text-md hover:bg-red-400/30 rounded-xl'
          })}
        >
          Go to Home page
        </Link>
      </header>
    </>
  ) 
}