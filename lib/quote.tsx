export async function getRandomQuote() {
  const res = await fetch("https://dummyjson.com/quotes/random", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed fetch");
  }

  return res.json();
}