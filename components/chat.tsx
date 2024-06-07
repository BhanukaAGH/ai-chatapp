'use client'

import { useChat } from 'ai/react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ChatBubble from '@/components/chat-bubble'
import { ScrollArea } from '@/components/ui/scroll-area'

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

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

      <form onSubmit={handleSubmit} className='p-4 flex clear-both'>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder='Type to chat with AI...'
          className='mr-2'
        />

        <Button type='submit' className='w-24'>
          {isLoading ? 'Loading...' : 'Ask'}
        </Button>
      </form>
    </div>
  )
}

export default Chat
