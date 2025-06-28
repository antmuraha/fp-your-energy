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

// Navigation Home <---> Favorites
document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.querySelector('.link-home-btn');
  const favoritesBtn = document.querySelector('.link-favorites-btn');

  function setActiveNav(active, inactive) {
    active.classList.add('nav-btn-active');
    active.classList.remove('nav-btn-inactive');

    inactive.classList.add('nav-btn-inactive');
    inactive.classList.remove('nav-btn-active');
  }

  homeBtn.addEventListener('click', e => {
    setActiveNav(homeBtn, favoritesBtn);
  });

  favoritesBtn.addEventListener('click', e => {
    setActiveNav(favoritesBtn, homeBtn);
  });
});