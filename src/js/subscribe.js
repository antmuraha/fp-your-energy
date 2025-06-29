import client from './api/client.js';
import 'izitoast/dist/css/iziToast.min.css';
import { Messages } from './messages.js';

const form = document.getElementById('subscribeForm');
const emailInput = form.querySelector('input[name="email"]');
const subscribeBtn = document.getElementById('subscribeBtn');

emailInput.addEventListener('input', handleEmailValidation);
form.addEventListener('submit', subscribe);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleEmailValidation() {
  const emailValue = emailInput.value;
  const isValid = isValidEmail(emailValue);

  emailInput.style.borderColor = isValid ? 'green' : 'red';
}

async function subscribe(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const emailValue = formData.get('email');
  const isValid = isValidEmail(emailValue);
  if (!isValid) {
    console.error('Invalid email address');
    return Messages.error('Invalid email address');
  }

  subscribeBtn.disabled = true;
  client
    .subscribe(emailValue)
    .then(response => {
      form.reset();
      emailInput.style.borderColor = '';
      Messages.success(`${response.data.message}`);
    })
    .catch(error => {
      return Messages.error(error?.data?.message || 'Subscription failed');
    })
    .finally(() => {
      subscribeBtn.disabled = false;
    });
}
