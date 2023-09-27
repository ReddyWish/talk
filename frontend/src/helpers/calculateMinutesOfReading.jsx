export function calculateMinutesOfReading(text) {
  const wordsPerMinute = 200;

  const wordCount = text?.split(/\s+/).length;

  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime
}