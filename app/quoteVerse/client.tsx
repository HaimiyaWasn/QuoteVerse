"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import BackgroundImage from "@/public/backgroundImage/4.avif";
import { HiMiniChatBubbleLeftRight, HiOutlineArrowPath, HiOutlineCheck, HiOutlineClipboardDocument } from "react-icons/hi2";
import { getRandomQuote } from "@/lib/quote";

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
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-black/10 bg-black/5 p-10 backdrop-blur-xl"
      >
        <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex w-14 h-14 items-center justify-center rounded-2xl bg-black/10">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={quote.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                delay: isIntro ? 2 : 0,
                duration: 0.25,
              }}
            >
              <blockquote className="leading-relaxed font-medium text-white text-2xl md:text-3xl">
                "{quote.quote}"
              </blockquote>
              <p className="mt-8 text-lg font-semibold text-zinc-300 text-right">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={fetchNewQuote}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition duration-300 hover:scale-102"
            >
              <HiOutlineArrowPath 
                className={loading ? "animate-spin" : ""}
                size={20}
              />
              {loading ? "Loading..." : "New Quote"}
            </button>

            <button
              onClick={copyQuote}
              disabled={copied}
              title={copied ? "Copied" : "Copy Quote"}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                copied
                  ? "cursor-not-allowed border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10 active:bg-white/10"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={copied ? "copied" : "not-copied"}
                  initial={{
                    scale: 0.5,
                    opacity: 0,
                    rotate: -20,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    scale: 0.5,
                    opacity: 0,
                    rotate: 20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {copied ? (
                    <HiOutlineCheck size={22} />
                  ) : (
                    <HiOutlineClipboardDocument size={22} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
