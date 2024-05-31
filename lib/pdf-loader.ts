import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { env } from './config'

export const getChunkedDocsFromPDF = async () => {
  try {
    const loader = new PDFLoader(env.PDF_PATH)
    const docs = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ['\n\n', '\n', ' ', ''],
      chunkOverlap: 50,
    })

    const chunkedDocs = await textSplitter.splitDocuments(docs)

    return chunkedDocs
  } catch (error) {
    console.error(error)
    throw new Error('PDF docs chuncking failed.')
  }
}
