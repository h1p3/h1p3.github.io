document.addEventListener("DOMContentLoaded", function () {
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