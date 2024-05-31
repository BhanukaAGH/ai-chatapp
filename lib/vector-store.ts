import { env } from './config'
import { Document } from 'langchain/document'
import { PineconeStore } from '@langchain/pinecone'
import { Pinecone } from '@pinecone-database/pinecone'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

export const embedAndStoreDocs = async (
  client: Pinecone,
  docs: Document<Record<string, any>>[]
) => {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings()
    const index = client.Index(env.PINECONE_INDEX_NAME)

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: env.PINECONE_NAME_SPACE,
      textKey: 'text',
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to embed and store docs.')
  }
}
