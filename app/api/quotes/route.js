import { NextResponse } from "next/server";
import { getRandomQuote } from "@/lib/quote";

export async function GET() {
  return NextResponse.json(await getRandomQuote());
}