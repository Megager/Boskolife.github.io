// Swiper:

function destroySlidersOnResize(selector, width, obj, moreThan) {
  const init = {
    ...obj,
  };

  const win = window;
  const sliderSelector = document.querySelector(selector);
  let swiper = new Swiper(selector, init);

  const toggleInit = () => {
    const neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width
    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach((evt) =>
    win.addEventListener(evt, toggleInit, false)
  );
}

destroySlidersOnResize(".me-slider", 99999, {
  spaceBetween: 20,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000,
});

destroySlidersOnResize(".awards-slider", 99999, {
  spaceBetween: 10,
  slidesPerView: 4,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000,
  loop: true,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    550: {
      slidesPerView: 2
    },

    760: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },
});

destroySlidersOnResize(".team-slider", 99999, {
  spaceBetween: 40,
  slidesPerView: 3,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 2
    },

    1024: {
      slidesPerView: 3
    },

  },

});
destroySlidersOnResize(".board-slider", 99999, {
  spaceBetween: 40,
  slidesPerView: 4,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000,

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 2
    },

    760: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },
});

/* header */

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {

    const targetElement = e.target;

    if (window.innerWidth < 1024) {
      if (targetElement.classList.contains('arrow')) {
        targetElement.closest('.menu-item').classList.toggle('menu-item_active');
      }
    }
  }
};

const burger = document.querySelector(".burger");

if (burger) {
  burgerOutsideClick();
  burger.addEventListener("click", openMenu);
};

function openMenu(e) {
  document.body.classList.toggle("body_lock");
  document.body.classList.toggle("active");
  menuBody.classList.toggle("menu_active");
}

function closeMenu(e) {
  document.body.classList.remove("body_lock");
  document.body.classList.remove("active");
  menuBody.classList.remove("menu_active");
}

function burgerOutsideClick() {
  let backdrop = document.querySelector('.backdrop');
  backdrop.addEventListener('click', closeMenu);
}