"use client";

import { useState } from "react";

type Quote = {
  id: number,
  quote: string,
  author: string,
};

type Props = {
  initialQuote: Quote;
};

export default function ClientQuoteVerse({ initialQuote }: Props) {
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);

  async function fetchNewQuote() {
    try {
      setLoading(true);

      const res = await fetch(`/api/quoteVerses`, {
        cache: "no-store",
      });

      const data = await res.json();

      setQuote(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>

    </section>
  )
}
