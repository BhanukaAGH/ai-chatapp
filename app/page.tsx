import Chat from '@/components/chat'
import SiteNav from '@/components/site-nav'

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col'>
      <SiteNav />

      <div className='container flex flex-col flex-1 py-4'>
        <Chat />
      </div>
    </main>
  )
}

export default Home
