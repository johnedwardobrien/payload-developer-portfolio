import { NextRequest, NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'

/**
 * Content Target Chat API Route - POST endpoint
 *
 * This endpoint handles content target chat functionality with vector embeddings
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
  const { pineconeIndex, promptContext, promptInstructions, message } = body

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

  // Get all matches from the matches array
  const matches = queryResponse.matches || []

  if (!matches || matches.length === 0) {
    return NextResponse.json({ error: 'No matching content found' }, { status: 404 })
  }

  // Extract Bible verse data from matches and format as a list
  const bibleVerses = matches
    .filter((match) => match.metadata && (match.metadata.book || match.metadata.reference))
    .map((match) => {
      const metadata = match.metadata || {}
      const book = metadata.book || 'Unknown'
      const chapter = metadata.chapter || ''
      const verse = metadata.verse || ''
      const reference = metadata.reference || `${book} ${chapter}:${verse}`
      const verseText = metadata.verseText || metadata.text || ''

      return {
        book,
        chapter,
        verse,
        reference,
        verseText,
      }
    })

  // Convert to a formatted string with list of Books, Chapters, and Verses
  const bibleContext = bibleVerses
    .map((verse) => {
      return `Book: ${verse.book}\nChapter: ${verse.chapter}\nVerse: ${verse.verse}\nReference: ${verse.reference}\nText: ${verse.verseText}`
    })
    .join('\n\n---\n\n')

  // Create a prompt with interpolated context and instructions
  const fullPrompt = `${promptContext}

"${bibleContext}"

${promptInstructions}

User question: ${message}`

  // Query ChatGPT
  const chatResponse = await chatModel.invoke(fullPrompt)

  const donQuixoteResponse =
    typeof chatResponse.content === 'string' ? chatResponse.content : String(chatResponse.content)

  return NextResponse.json({ response: donQuixoteResponse }, { status: 200 })
}
