import Chat from '@/components/chat'
import SiteNav from '@/components/site-nav'

const Home = () => {
  return (
    <main className='flex h-screen flex-col'>
      <SiteNav />

      <div className='container flex flex-col flex-1 py-4 h-[90vh]'>
        <Chat />
      </div>
    </main>
  )
}

export default Home
