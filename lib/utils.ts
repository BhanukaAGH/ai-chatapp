import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToBottom(containerRef: React.RefObject<HTMLDivElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'end',
      }

      lastMessage.scrollIntoView(scrollOptions)
    }
  }
}
