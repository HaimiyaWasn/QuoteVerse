import { getRandomQuote } from "@/lib/quote"

import ClientQuoteVerse from "./client"

type Quote = {
  id: number,
  quote: string,
  author: string,
}

export default async function QuoteVerse() {
  const quote = await getRandomQuote();

  return <ClientQuoteVerse initialQuote={quote} />
}