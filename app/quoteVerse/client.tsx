"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import BackgroundImage from "@/public/backgroundImage/4.avif";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";

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

      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.5,
        }}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-orange-500/10 bg-amber-400/5 p-10 backdrop-blur-xl"
      >
        <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex w-14 h-14 items-center justify-center rounded-2xl bg-amber-400/10">
              <HiMiniChatBubbleLeftRight size={28} className="text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Random Quote
              </p>
              <h2 className="text-2xl font-bold text-white">
                Daily Inspiration
              </h2>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
