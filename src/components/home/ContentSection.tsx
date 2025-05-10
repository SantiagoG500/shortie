'use client'
import { Card, CardBody, CardHeader, ScrollShadow } from '@heroui/react';
import { Lock, Palette, Rocket } from 'lucide-react';

export function ContentSection() {
 return (
  <>
    <header className='flex justify-center text-center mt-9'>
      <h2 className='font-bold text-[2.3rem] lg:text-4xl pb-2 text-center bg-slate-950  tracking-tight inline from-primary-200 to-primary-500 bg-clip-text text-transparent bg-gradient-to-bl'>
        Why Shortie?
      </h2>
    </header>
    <ScrollShadow className='w-4/5 mx-auto mt-6 p-4' orientation='horizontal'>
      <section className='flex flex-nowrap gap-4'>
        <Card className='min-w-96'>
          <CardHeader className='text-xl font-bold pb-0'>
            <div className='bg-content2 p-2 rounded-full'>
              <Rocket className='text-primary-500 w-6 h-6' strokeWidth={2}/>
            </div>
              <span className='inline-block ml-2 font-bold'>Fast</span>
          </CardHeader>
          <CardBody>
            <p className='text-foreground/55'>
              just paste your link and Shortie shortens it instantly. Whether you're on mobile or desktop, it's optimized for speed so you can get back to sharing faster.
            </p>
          </CardBody>
        </Card>
          
        <Card className='min-w-96'>
          <CardHeader className='text-xl font-bold pb-0'>
            <div className='bg-content2 p-2 rounded-full'>
              <Lock className='text-primary-500 w-6 h-6' strokeWidth={2}/>
            </div>
              <span className='inline-block ml-2 font-bold'>Secure and private</span>
          </CardHeader>
          <CardBody>
            <p className='text-foreground/55'>
              Shortie puts your privacy first. All links are generated securely over HTTPS, and we don’t track users unnecessarily. Your data stays yours. No funny business behind the scenes.
            </p>
          </CardBody>
        </Card>
          
        <Card className='min-w-96'>
          <CardHeader className='text-xl font-bold pb-0'>
            <div className='bg-content2 p-2 rounded-full'>
              <Palette className='text-primary-500 w-6 h-6' strokeWidth={2}/>
            </div>
              <span className='inline-block ml-2 font-bold'>Custom tags</span>
          </CardHeader>
          <CardBody>
            <p className='text-foreground/55'>
              Organize your links with personalized tags and colors. Whether you're managing content, campaigns, or just staying tidy, tags make finding and filtering easy.
            </p>
          </CardBody>
        </Card>

      </section>
    </ScrollShadow>
  </>
 ) 
}