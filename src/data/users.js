export default {
  characters,
  getRandomQuote() {
     return randomQuote().next().value;
  }
};