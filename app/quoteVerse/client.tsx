"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import BackgroundImage from "@/public/backgroundImage/2.webp";

type Quote = {
  id: number;
  quote: string;
  author: string;
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

  async function copyQuote() {
    if (copied) return;

    await navigator.clipboard.writeText(`"${quote.quote}"\n— ${quote.author}`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen overflow-hidden items-center justify-center px-6 py-16">
      <Image
        src={BackgroundImage}
        alt="Background Image"
        fill
        priority
        className={`object-cover transition-all duration-1500 ease-in-out ${
          isMounted ? "blur-0 scale-100" : "blur-lg scale-105"
        }`}
      />
    </section>
  );
}
