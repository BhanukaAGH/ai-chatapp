import { ThemeToggle } from '@/components/theme-toggle'

const SiteNav = () => {
  return (
    <nav className='supports-[backdrop-filter]:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg'>
      <div className='container flex h-16 items-center justify-between'>
        <h2 className='uppercase font-bold'>React Interview PrepBot</h2>
        <ThemeToggle />
      </div>
      <hr className='m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200 to-neutral-200/0 dark:via-neutral-200/30' />
    </nav>
  )
}

export default SiteNav
