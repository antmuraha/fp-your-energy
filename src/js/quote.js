import axios from 'axios';

const description = document.querySelector('.quote-description');
const author = document.querySelector('.quote-author');

async function loadQuote() {
  const today = new Date().toISOString().split('T')[0];
  const savedQuote = JSON.parse(localStorage.getItem('quoteOfTheDay'));

  if (savedQuote && savedQuote.date === today) {
    description.textContent = savedQuote.quote.quote;
    author.textContent = savedQuote.quote.author;
  } else {
    try {
      const { data: quote } = await axios.get("https://your-energy.b.goit.study/api/quote");
      description.textContent = quote.quote;
      author.textContent = quote.author;
      localStorage.setItem(
        'quoteOfTheDay',
        JSON.stringify({ date: today, quote })
      );
    } catch (error) {
      console.error('Something is wrong during getting quote', error);
    }
  }
}
loadQuote();
