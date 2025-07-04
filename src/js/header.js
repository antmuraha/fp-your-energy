function initHeaderMainButtons(hashtagManager) {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('burgerMenu');
  const closeBtn = document.getElementById('close-mob-menu');
  const socialLinks = document.querySelector('.social-links');

  const homeBtn = document.querySelector('.link-home-btn');
  const favoritesBtn = document.querySelector('.link-favorites-btn');

  const homeMobileBtn = document.querySelector('.link-home-mobile');
  const favoritesMobileBtn = document.querySelector('.link-favorites-mobile');

  // --- NAVIGATION STATE FUNCTIONS ---
  function setActiveNav(activeBtn, inactiveBtn) {
    activeBtn.classList.add('nav-btn-active');
    activeBtn.classList.remove('nav-btn-inactive');

    inactiveBtn.classList.add('nav-btn-inactive');
    inactiveBtn.classList.remove('nav-btn-active');
  }

  function detectPage() {
    const isFavoritesPage = hashtagManager.isActive('#favorites');

    if (isFavoritesPage) {
      setActiveNav(favoritesBtn, homeBtn);
      setActiveNav(favoritesMobileBtn, homeMobileBtn);
    } else {
      setActiveNav(homeBtn, favoritesBtn);
      setActiveNav(homeMobileBtn, favoritesMobileBtn);
    }
  }

  // --- NAVIGATION EVENTS ---
  function handleNavClick(isFavorites = false) {
    mobileMenu.classList.remove('open');
    setTimeout(detectPage, 50);
  }

  homeBtn.addEventListener('click', () => handleNavClick(false));
  favoritesBtn.addEventListener('click', () => handleNavClick(true));

  homeMobileBtn.addEventListener('click', () => handleNavClick(false));
  favoritesMobileBtn.addEventListener('click', () => handleNavClick(true));

  // --- BURGER MENU ---
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

  // --- SOCIAL ICON VISIBILITY ---
  const updateSocialLinksVisibility = () => {
    if (window.innerWidth <= 768) {
      socialLinks.style.display = 'none';
    } else {
      socialLinks.style.display = '';
    }
  };

  // --- REMOVE FOCUS AFTER CLICK ---
  document.querySelectorAll('.link-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.blur();
    });
  });

  updateSocialLinksVisibility();
  detectPage();
};

export default initHeaderMainButtons;