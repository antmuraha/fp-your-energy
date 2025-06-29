import { api } from './api/index.js';

const description = document.querySelector('.quote-description');
const author = document.querySelector('.quote-author');

async function loadQuote() {
  const today = new Date().toISOString().split('T')[0];
  const savedQuote = JSON.parse(localStorage.getItem('quoteOfTheDay'));

  if (savedQuote && savedQuote.date === today) {
    description.textContent = savedQuote.quote.quote;
    author.textContent = savedQuote.quote.author;
  } else {
    const { data: quote, isError, error } = await api.get('/quote');
    if (isError) {
      // Todo: Implement UI for Error
    } else {
      description.textContent = quote.quote;
      author.textContent = quote.author;
      localStorage.setItem(
        'quoteOfTheDay',
        JSON.stringify({ date: today, quote }),
      );
    }
  }
}

loadQuote();
