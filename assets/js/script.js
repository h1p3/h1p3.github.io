document.addEventListener("DOMContentLoaded", function () {
    // === Header Dropdown ===
    var dropdown = document.getElementById('headerDropdown');
    var triggers = document.querySelectorAll('[data-dropdown-trigger]');
    var dropdownCats = document.querySelectorAll('.header__dropdown-cat');
    var dropdownServices = document.querySelectorAll('.header__dropdown-services');

    function openDropdown(panelId) {
        if (!dropdown) return;
        dropdown.classList.add('is-open');
        document.querySelectorAll('.header__dropdown-panel').forEach(function (p) {
            p.classList.toggle('is-active', p.getAttribute('data-dropdown-panel') === panelId);
        });
        document.querySelectorAll('[data-dropdown-trigger]').forEach(function (t) {
            t.classList.toggle('is-dropdown-open', t.getAttribute('data-dropdown-trigger') === panelId);
            t.classList.toggle('header__nav-link--active', t.getAttribute('data-dropdown-trigger') === panelId);
        });
        if (panelId === 'uslugi') {
            dropdownCats.forEach(function (c) {
                var cat = c.getAttribute('data-dropdown-cat');
                c.classList.toggle('header__dropdown-cat--active', cat === 'alkogolizm');
            });
            dropdownServices.forEach(function (s) {
                s.classList.toggle('is-active', s.getAttribute('data-dropdown-services') === 'alkogolizm');
            });
        }
    }

    function closeDropdown() {
        if (dropdown) dropdown.classList.remove('is-open');
        document.querySelectorAll('[data-dropdown-trigger]').forEach(function (t) {
            t.classList.remove('is-dropdown-open');
        });
    }

    if (triggers.length && dropdown) {
        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 1023) return;
                e.preventDefault();
                var panelId = trigger.getAttribute('data-dropdown-trigger');
                var isOpen = dropdown.classList.contains('is-open');
                var currentPanel = dropdown.querySelector('.header__dropdown-panel.is-active');
                var currentId = currentPanel ? currentPanel.getAttribute('data-dropdown-panel') : null;
                if (isOpen && currentId === panelId) {
                    closeDropdown();
                } else {
                    openDropdown(panelId);
                }
            });
        });

        dropdown.querySelectorAll('.header__dropdown-cat').forEach(function (cat) {
            function switchCategory(catId) {
                dropdownCats.forEach(function (c) {
                    c.classList.toggle('header__dropdown-cat--active', c.getAttribute('data-dropdown-cat') === catId);
                });
                dropdownServices.forEach(function (s) {
                    s.classList.toggle('is-active', s.getAttribute('data-dropdown-services') === catId);
                });
            }
            cat.addEventListener('mouseenter', function () {
                switchCategory(cat.getAttribute('data-dropdown-cat'));
            });
            cat.addEventListener('click', function (e) {
                e.preventDefault();
                switchCategory(cat.getAttribute('data-dropdown-cat'));
            });
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.classList.contains('is-open')) return;
            if (!dropdown.contains(e.target) && !e.target.closest('[data-dropdown-trigger]')) {
                closeDropdown();
            }
        });
    }

    function popupClose(popupActive) {
      popupActive.classList.remove('open');
      setTimeout(() => {
          popupActive.classList.contains("open") || popupActive.classList.remove("active");
      }, 400);
      document.body.classList.remove('lock');
      document.querySelector('html').style.paddingRight = 0;
      document.querySelector('html').classList.remove('lock');
      document.querySelector('header').removeAttribute('style');
  }
  const popupOpenBtns = document.querySelectorAll('.popup-btn');
  const popups = document.querySelectorAll('.popup');
  const closePopupBtns = document.querySelectorAll('.close-popup');
  closePopupBtns.forEach(function (el) {
      el.addEventListener('click', function (e) {
          popupClose(e.target.closest('.popup'));
      });
  });
  if(popups.length > 0){
    popups.forEach(function (popup) {
      popupClose(popup);
      popup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
        
            popupClose(e.target.closest('.popup'));
        }
      });
    });
  }  
  popupOpenBtns.forEach(function (el) {
      el.addEventListener('click', function (e) {
          e.preventDefault();
          const path = e.currentTarget.dataset.path;
          const currentPopup = document.querySelector(`[data-target="${path}"]`);
          if (currentPopup) {
              currentPopup.classList.add('active');
              setTimeout(() => {
                  currentPopup.classList.add("open");
              }, 10);
              if (currentPopup.getAttribute("data-target") == 'popup-change') {
                let currentItem = el.closest('.change-item');
                let originalTop = currentPopup.querySelector('.original-title');
                let title = currentItem.querySelector('.change-title');
                let subtitle = currentItem.querySelector('.change-subtitle');
                if (title && subtitle) {
                    var newTitle = title.innerHTML + ' ' + subtitle.innerHTML;
                } else if (title) {
                    var newTitle = title.innerHTML;
                } else {
                    var newTitle = subtitle.innerHTML;
                }
                if (el.classList.contains('change-doctor')) {
                    newTitle = 'Записаться на приём к врачу: ' + newTitle;
                }
                originalTop.innerHTML = newTitle;
            };
             // scrollWidthFunc();
              document.querySelector('html').classList.add('lock');
          }
      });
  });
  });