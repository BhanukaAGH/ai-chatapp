'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

import { scrollToBottom } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ChatBubble from '@/components/chat-bubble'
import { ScrollArea } from '@/components/ui/scroll-area'

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  useEffect(() => {
    const timeOut = setTimeout(() => {
      scrollToBottom(containerRef)
    }, 100)

    return () => clearTimeout(timeOut)
  }, [messages])

  return (
    <div className='flex h-[90vh] flex-col justify-between'>
      <ScrollArea>
        <div ref={containerRef} className='px-6 space-y-3'>
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
