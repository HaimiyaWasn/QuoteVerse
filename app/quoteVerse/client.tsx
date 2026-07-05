"use client";

import { useEffect, useState } from "react";

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
    };
  };

  async function copyQuote() {
    if (copied) return;

    await navigator.clipboard.writeText(`"${quote.quote}"\n— ${quote.author}`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>

    </section>
  )
}
