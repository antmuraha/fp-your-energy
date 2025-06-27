const footerForm = document.getElementById('footer-form');

footerForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const emailInput = footerForm.elements['email'];
  const email = emailInput.value.trim();

  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  try {
    const response = await fetch('https://your-energy.b.goit.study/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || 'Server error');
    }

    alert('You’ve successfully subscribed!');
    footerForm.reset();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});