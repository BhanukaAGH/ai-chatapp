import { NextResponse } from 'next/server'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { LangChainStream, Message, StreamingTextResponse } from 'ai'
import { getVectorStore } from '@/lib/vector-store'
import { getPineconeClient } from '@/lib/pinecone-client'
import { AIMessage, ChatMessage, HumanMessage } from '@langchain/core/messages'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const convertVercelMessageToLangChainMessage = (message: Message) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content)
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content)
  } else {
    return new ChatMessage(message.content, message.role)
  }
}

export const POST = async (req: Request) => {
  const body = await req.json()
  const messages: Message[] = body.messages ?? []
  const previousMessages = messages
    .slice(0, -1)
    .map(convertVercelMessageToLangChainMessage)
  const question = messages[messages.length - 1].content

  if (!question) {
    return NextResponse.json('Error: No question in the request', {
      status: 400,
    })
  }

  try {
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ')
    const pineconeClient = await getPineconeClient()
    const vectorStore = await getVectorStore(pineconeClient)
    const retriever = vectorStore.asRetriever()

    const { stream, handlers } = LangChainStream()

    const chatModel = new ChatGoogleGenerativeAI({
      model: 'gemini-pro',
      streaming: true,
      callbacks: [handlers],
    })

    const rephrasingModel = new ChatGoogleGenerativeAI({
      model: 'gemini-pro',
    })

    // Contextualize question
    const contextualizeQSystemPrompt = `Given a chat history (if any) and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.`

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ['system', contextualizeQSystemPrompt],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
    ])

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt: contextualizeQPrompt,
    })

    // Answer question
    const qaSystemPrompt = `You are a helpful and enthusiastic support bot who can answer a given question about React js based on the context provided and the conversation history. Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to official React documentation at https://react.dev/reference/react. Don't try to make up an answer. Always speak as if you were chatting to a friend.
    \n\n
    {context}`

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ['system', qaSystemPrompt],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
    ])

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: qaPrompt,
    })

    const chain = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    })

    chain.invoke({
      chat_history: previousMessages,
      input: sanitizedQuestion,
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Internal server error ', error)
    return NextResponse.json('Error: Something went wrong. Try again!', {
      status: 500,
    })
  }
}