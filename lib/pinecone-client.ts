import { Pinecone } from '@pinecone-database/pinecone'
import { env } from './config'

let pineconeClientInstance: Pinecone | null

export const createIndex = async (client: Pinecone, indexName: string) => {
  try {
    console.log('Index creating...')

    await client.createIndex({
      name: indexName,
      dimension: 768,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    })

    console.log('Index created.')
  } catch (error) {
    console.error('error ', error)
    throw new Error('Index creation failed.')
  }
}

export const initPinecone = async () => {
  try {
    const pinecone = new Pinecone({ apiKey: env.PINECONE_API_KEY })

    const existingIndexes = await pinecone.listIndexes()
    const indexName = env.PINECONE_INDEX_NAME

    if (!existingIndexes.indexes?.find((index) => index.name === indexName)) {
      await createIndex(pinecone, indexName)
    }

    return pinecone
  } catch (error) {
    console.log('error', error)
    throw new Error('Failed to initialize Pinecone Client')
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPinecone()
  }

  return pineconeClientInstance
}
