/**
 * Simple Sentiment Analysis using a basic algorithm
 * This is a placeholder implementation. Replace with actual ML model integration.
 */

// Simple positive and negative word lists
const positiveWords = [
  'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'awesome',
  'perfect', 'brilliant', 'outstanding', 'beautiful', 'happy', 'joy', 'pleased', 'delighted',
  'nice', 'fine', 'well', 'superb', 'impressive', 'remarkable', 'fabulous', 'terrific'
];

const negativeWords = [
  'bad', 'terrible', 'awful', 'horrible', 'dreadful', 'hate', 'dislike', 'poor',
  'worst', 'evil', 'disgusting', 'disappointing', 'annoying', 'frustrating', 'sad', 'upset',
  'angry', 'furious', 'miserable', 'pathetic', 'rubbish', 'garbage', 'useless', 'worthless'
];

const intensifiers = ['very', 'extremely', 'incredibly', 'absolutely', 'really', 'so'];
const negations = ['not', 'no', 'neither', 'never', 'hardly', 'barely'];

/**
 * Analyze sentiment of text
 * @param {string} text - Text to analyze
 * @returns {object} - Sentiment analysis result
 */
function analyzeSentiment(text) {
  const lowerText = text.toLowerCase();
  const words = lowerText.match(/\b\w+\b/g) || [];

  let positiveScore = 0;
  let negativeScore = 0;
  let hasNegation = false;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check for negations
    if (negations.includes(word)) {
      hasNegation = true;
      continue;
    }

    // Check for intensifiers
    const hasIntensifier = i > 0 && intensifiers.includes(words[i - 1]);
    const multiplier = hasIntensifier ? 1.5 : 1;

    if (positiveWords.includes(word)) {
      positiveScore += 1 * multiplier;
    } else if (negativeWords.includes(word)) {
      negativeScore += 1 * multiplier;
    }
  }

  // Apply negation
  if (hasNegation) {
    const temp = positiveScore;
    positiveScore = negativeScore;
    negativeScore = temp;
  }

  // Calculate final score
  const totalScore = positiveScore + negativeScore;
  const score = totalScore === 0 ? 0 : (positiveScore - negativeScore) / totalScore;

  // Determine sentiment
  let sentiment = 'neutral';
  let confidence = 0;

  if (score > 0.1) {
    sentiment = 'positive';
    confidence = Math.min(score, 1);
  } else if (score < -0.1) {
    sentiment = 'negative';
    confidence = Math.min(Math.abs(score), 1);
  } else {
    confidence = 0.5;
  }

  return {
    sentiment,
    score,
    confidence,
  };
}

module.exports = { analyzeSentiment };
