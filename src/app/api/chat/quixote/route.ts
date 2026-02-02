import { NextRequest, NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'

/**
 * Character Dialogue Chat API Route - POST endpoint
 *
 * This endpoint handles dialogue chat functionality with vector embeddings
 * Requires: pineconeIndex, promptContext, promptInstructions, and message
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const openaiApiKey = process.env.OPENAI_API_KEY
  const pineconeApiKey = process.env.PINECONE_API_KEY
  const embeddingDimensions = process.env.EMBEDDING_DIMENSIONS
    ? parseInt(process.env.EMBEDDING_DIMENSIONS)
    : undefined

  // Parse request body
  const body = await request.json()
  const { message } = body
  let pineconeIndex = process.env?.QUIXOTE_INDEX ?? ''
  let promptContext = process.env?.QUIXOTE_PROMPT_CONTEXT ?? ''
  let promptInstructions = process.env?.QUIXOTE_PROMPT_INSTRUCTIONS ?? ''

  // Validate required parameters
  if (!pineconeIndex || !promptContext || !promptInstructions || !message) {
    return NextResponse.json(
      {
        error:
          'Missing required parameters: pineconeIndex, promptContext, promptInstructions, and message are required',
      },
      { status: 400 },
    )
  }

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
  const index = pinecone.index(pineconeIndex)

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

  // Create a prompt with interpolated context and instructions
  const fullPrompt = `${promptContext}

"${dialogueContext}"

${promptInstructions}

User question: ${message}`

  // Query ChatGPT
  const chatResponse = await chatModel.invoke(fullPrompt)

  const donQuixoteResponse =
    typeof chatResponse.content === 'string' ? chatResponse.content : String(chatResponse.content)

  return NextResponse.json({ response: donQuixoteResponse }, { status: 200 })
}
