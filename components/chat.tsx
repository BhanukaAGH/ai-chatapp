'use client'

import { toast } from 'sonner'
import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

import { scrollToBottom } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import ChatBubble from '@/components/chat-bubble'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle, SendHorizontal } from 'lucide-react'

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: '0',
          role: 'assistant',
          content:
            "Hello there! 👋 I'm your friendly React Assistant. I'm here to help you with any questions you might have about React.js.",
        },
      ],
    })

  useEffect(() => {
    const timeOut = setTimeout(() => {
      scrollToBottom(containerRef)
    }, 100)

    return () => clearTimeout(timeOut)
  }, [messages])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <div className='flex flex-col justify-between gap-6 h-full'>
      <ScrollArea className='p-6 flex-1'>
        <div ref={containerRef} className='space-y-3'>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring h-min'
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Type your message here...'
          className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
        />
        <div className='flex items-center p-3 pt-0'>
          <Button type='submit' size='sm' className='ml-auto'>
            {isLoading ? (
              <LoaderCircle className='size-6 animate-spin' />
            ) : (
              <SendHorizontal className='size-4' />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Chat
