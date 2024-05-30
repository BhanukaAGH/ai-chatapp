import { Message } from 'ai/react'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ChatBubbleProps extends Partial<Message> {}

const ChatBubble = ({ role = 'assistant', content }: ChatBubbleProps) => {
  if (!content) return null

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle
            className={
              role != 'assistant'
                ? 'text-amber-500 dark:text-amber-200'
                : 'text-blue-500 dark:text-blue-200'
            }
          >
            {role === 'assistant' ? 'AI' : 'You'}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm'>
          <span>{content}</span>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatBubble
