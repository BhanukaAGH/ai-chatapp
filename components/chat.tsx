import { Message } from 'ai/react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ChatBubble from '@/components/chat-bubble'
import { ScrollArea } from '@/components/ui/scroll-area'

const Chat = () => {
  const messages = [
    {
      role: 'assistant',
      content: 'Hello, how can I help you?',
    },
    {
      role: 'user',
      content: 'I want to buy a new computer',
    },
    {
      role: 'assistant',
      content: 'Ok, what is your budget?',
    },
  ] satisfies Partial<Message>[]

  return (
    <div className='flex h-[90vh] flex-col justify-between'>
      <ScrollArea className=''>
        <div className='px-6 space-y-3'>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </ScrollArea>

      <form className='p-4 flex clear-both'>
        <Input placeholder='Type to chat with AI...' className='mr-2' />

        <Button type='submit' className='w-24'>
          Ask
        </Button>
      </form>
    </div>
  )
}

export default Chat
