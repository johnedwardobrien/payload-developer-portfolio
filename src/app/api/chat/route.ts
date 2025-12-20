import { NextRequest, NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from '@langchain/openai'

/**
 * Chat API Route - POST endpoint
 *
 * This endpoint sets up connections to Pinecone and OpenAI
 * for chat functionality with vector embeddings
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const openaiApiKey = process.env.OPENAI_API_KEY
  const pineconeApiKey = process.env.PINECONE_API_KEY
  const pineconeIndexName = process.env.PINECONE_INDEX_NAME
  const embeddingDimensions = process.env.EMBEDDING_DIMENSIONS
    ? parseInt(process.env.EMBEDDING_DIMENSIONS)
    : undefined

  // Initialize OpenAI Embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: openaiApiKey,
    modelName: 'text-embedding-3-large',
    ...(embeddingDimensions && { dimensions: embeddingDimensions }),
  })

  // Initialize Pinecone
  const pinecone = new Pinecone({
    apiKey: pineconeApiKey || '',
  })
  const index = pinecone.index(pineconeIndexName || '')

  // Parse request body
  const body = await request.json()
  const message = body.message

  // Convert message to vector embedding
  const queryEmbedding = await embeddings.embedQuery(message)

  // Search Pinecone with the embedding
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 10,
    includeMetadata: true,
  })

  console.log('Pinecone query response:', JSON.stringify(queryResponse, null, 2))

  return NextResponse.json(null, { status: 200 })
}
