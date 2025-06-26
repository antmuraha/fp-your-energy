document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('burgerMenu');
  const closeBtn = document.getElementById('close-mob-menu');
  const socialLinks = document.querySelector('.social-links');

  const updateSocialLinksVisibility = () => {
    if (window.innerWidth <= 768) {
      socialLinks.style.display = 'none';
    } else {
      socialLinks.style.display = '';
    }
  };

  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });

  window.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });

  updateSocialLinksVisibility();
  window.addEventListener('resize', updateSocialLinksVisibility);
});