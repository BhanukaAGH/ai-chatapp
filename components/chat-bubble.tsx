import { Message } from 'ai/react'
import Markdown from 'react-markdown'

import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'

interface ChatBubbleProps extends Partial<Message> {}

const ChatBubble = ({ role = 'assistant', content }: ChatBubbleProps) => {
  if (!content) return null

  return (
    <div>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle
            className={cn(
              'flex items-center space-x-3 text-lg',
              role != 'assistant'
                ? 'text-amber-500 dark:text-amber-200'
                : 'text-blue-500 dark:text-blue-200'
            )}
          >
            {role === 'assistant' ? (
              <>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src='/chatbot.png' alt='chatbot' />
                </Avatar>
                <span>Assistant</span>
              </>
            ) : (
              <>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src='/user.png' alt='user' />
                </Avatar>
                <span>You</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm'>
          <Markdown className='prose dark:prose-invert'>{content}</Markdown>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatBubble
