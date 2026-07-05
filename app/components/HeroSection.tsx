"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Quote = {
  id: number;
  quote: string;
  author: string;
}

export default function HeroSection() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  async function fetchQuote(initial = false) {
    try {
      if (!initial) {
        setIsVisible(false);

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      
      const res = await fetch("/api/quoteVerses", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch quote");
      const data: Quote = await res.json();
      setQuote(data);
      setIsVisible(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchQuote(true);

    const interval = setInterval(() => {
      fetchQuote();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[#FFF8F0] text-[#2D241D]">
      <motion.header 
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6"
      >
        <h1 className="text-2xl font-bold tracking-tight text-[#8A5523]">
          QuoteVerse
        </h1>
        
        <Link href="/quoteVerse">
          <button className="rounded-full bg-[#C97B36] px-5 py-2.5 font-medium text-white transition hover:bg-[#B2682A] cursor-pointer">
            Get Started
          </button>
        </Link>
      </motion.header>
      
      <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-center justify-between gap-16 px-8 md:pt-28 py-14">
        <div className="max-w-2xl">
          <motion.span 
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.75,
              delay: 0.5,
            }}
            className="rounded-full text-sm font-medium text-[#9A6330] bg-[#F8E7D1] px-4 py-2"
          >
            ☀ Daily Inspiration
          </motion.span>
          
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.75,
            }}
          >
            <h2 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
              Find words that inspire you. 
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Explore a collection of quotes from famous authors, philosophers, and thought leaders. 
              Get inspired and motivated every day with our hand-picked selection of quotes that will uplift your spirits and help you achieve your goals.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl">
          <motion.div 
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 1,
            }}
            className="rounded-3xl border border-black/10 bg-black/5 p-8 backdrop-blur-xl"
          >
            <span className="text-[#B68458]">Today's Quote</span>

            <div className="mt-6 min-h-50 flex items-center">
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.div
                    key={quote?.id ?? "loading"}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -25,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="w-full"
                  >
                    {quote ? (
                      <>
                        <p className="text-2xl leading-10 font-medium text-[#2D241D]">
                          "{quote.quote}"
                        </p>

                        <p className="mt-8 text-right text-[#9A6330] font-semibold">
                          — {quote.author}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="h-7 w-3/4 animate-pulse rounded bg-black/10" />
                        <div className="mt-4 h-7 w-full animate-pulse rounded bg-black/10" />
                        <div className="mt-4 h-7 w-5/6 animate-pulse rounded bg-black/10" />

                        <div className="mt-10 ml-auto h-5 w-28 animate-pulse rounded bg-black/10" />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
