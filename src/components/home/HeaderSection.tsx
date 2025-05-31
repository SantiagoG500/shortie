'use client'
import { Link, button as buttonStyles } from "@heroui/react";
import NextLink from 'next/link';
import { DemonstrationLinkCard } from '../DemonstrationLinkCard';

export function HeaderSection() {
  return (
    <>
      <div className='flex flex-col items-center md:flex-row md:justify-around'>
        <div className='flex flex-col items-center text-center w-3/4 md:w-2/5 md:items-start md:text-start'>
          <h1 className='font-bold text-[2.3rem] lg:text-5xl leading-9'>
            Shorten URLs with Ease
            <span className='tracking-tight inline from-primary-200 to-primary-500 bg-clip-text text-transparent bg-gradient-to-bl'>
              {' Fast, Simple, and Reliable '}
            </span>
            with Shortie
          </h1>
          <span className='mt-3'>Shorten, brand, and track every link — <span className='text-primary-500 font-semibold'>effortlessly.</span></span>

          <div className='mt-3'>
            <Link
              href='/dashboard'
              as={NextLink}
              className={buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'shadow'
              })}
            >
              Start creating links
            </Link>
          </div>
        </div>
        
        <div className='flex flex-col items-center md:items-start gap-3 w-11/12 md:w-min mt-24 md:mt-0'>
            <h1 className='font-bold text-2xl lg:text-3xl tracking-tight inline from-primary-200 to-primary-500 bg-clip-text text-transparent bg-gradient-to-bl'>Give it a try</h1>
            <DemonstrationLinkCard
              linkData={{
                id: 'eai42kewuhv9vdquwn88h6jf',
                title: 'Shortie Repo 🔗',
                description: 'Check the Github Shortie Repo',
                clicks: 0,
                createdAt:'2025-05-09',
                recentClick: '2025-05-09',
                slug: 'bmayo8z',
                url: 'https://github.com/SantiagoG500/shortie',
              }}
            />
        </div>
      </div>


    </>
  )
}