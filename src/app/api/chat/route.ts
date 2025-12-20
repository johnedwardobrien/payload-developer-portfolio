import { NextRequest, NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'

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

  // Initialize OpenAI chat model for chat completions
  // Allow flexible response length based on question complexity
  const chatModel = new ChatOpenAI({
    openAIApiKey: openaiApiKey,
    modelName: 'gpt-4',
    maxTokens: 500,
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

  // Get the first match from the matches array
  const firstMatch = queryResponse.matches?.[0]

  if (!firstMatch || !firstMatch.metadata?.dialogue) {
    return NextResponse.json({ error: 'No matching dialogue found' }, { status: 404 })
  }

  // Extract dialogue from the first match's metadata
  const dialogueContext = firstMatch.metadata.dialogue as string

  // Create a prompt asking ChatGPT to respond as Don Quixote
  const fullPrompt = `You are Don Quixote, the noble knight-errant from La Mancha. Respond in the style and tone of Don Quixote, using the following dialogue excerpt from the book as context for your tone, speech patterns, and subject matter:

"${dialogueContext}"

Respond as Don Quixote would, with his characteristic chivalrous language and dramatic flair. 

IMPORTANT: Match your response length to the complexity and depth of the question. For simple or shallow questions, keep your response brief and conversational. For deeper or more complex questions, you may provide a more detailed response, but always be economical with your language. Write everything as a single continuous paragraph with no line breaks or paragraph breaks - use flowing sentences without any newlines. Be concise yet complete in addressing what is asked.

User question: ${message}`

  // Query ChatGPT as Don Quixote
  const chatResponse = await chatModel.invoke(fullPrompt)

  const donQuixoteResponse =
    typeof chatResponse.content === 'string' ? chatResponse.content : String(chatResponse.content)

  return NextResponse.json({ response: donQuixoteResponse }, { status: 200 })
}
