const winTriggersMethods = ['resize', 'load'];
initTabs();
initBurger();
initNavBtn();
findHref();
renderDateSelects()
hideText();
calcPages();
initPuzzleAnimation();
winTriggersMethods.forEach((method) => {
    window.addEventListener(method, () => {
        // worst case to refresh animation?
        ScrollTrigger.killAll();
        initPuzzleAnimation()
    })
})

function findHref() {
    let element = document.getElementById("menu").getElementsByTagName("a");
    let url = window.location.href;
    for (let i = 0; i < element.length; i++) {
        if (url === element[i].href) {
            element[i].classList.add("item_active");
        }
    }
}

function initBurger() {
    const burger = document.querySelector(".burger_menu");
    const menuBody = document.querySelector(".nav");

    document.addEventListener("click", function (event) {
        if (burger.contains(event.target)) {
            menuBody.classList.toggle("menu_active");
            burger.classList.toggle("burger_active");
            document.body.classList.toggle("body_lock");
            return;
        }
        if (!menuBody.contains(event.target)) {
            menuBody.classList.remove("menu_active");
            burger.classList.remove("burger_active");
            document.body.classList.remove("body_lock");
        }
    });
}

function initTabs() {
    const faqTabs = document.querySelector("#faqTabs");

    if (!faqTabs) return;

    const tabs = document.querySelectorAll(".tab_title"),
        tabsContent = document.querySelectorAll(".tab_content"),
        tabsParent = document.querySelector(".tab_wrapper");

    function showTabContent(i = 0) {
        tabsContent[i].classList.toggle("show");
        tabs[i].classList.toggle("tab_active");
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tab_title")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    showTabContent(i);
                }
            });
        }
    });

    !window.location.href.includes("faq") && showTabContent();
}

function initNavBtn() {
    const flyBtn = document.querySelector("#flyBtn");

    if (!flyBtn) return;

    const navBtn = document.querySelector(".nav_btn"),
        navTable = document.querySelector(".nav_table"),
        navLink = document.querySelectorAll(".nav_table_link"),
        header = document.querySelector('#header');

    navBtn.addEventListener("click", () => {
        navTable.classList.toggle("show_table");
        document.body.classList.toggle("body_lock");
    });

    navLink.forEach((item) => {
        item.addEventListener("click", () => {
            navTable.classList.remove("show_table");
            document.body.classList.remove("body_lock");
        });
    });

    const fixedNav = ScrollTrigger.create({
        trigger: ".nav_table",
        start: "-90px top",
        endTrigger: "#footer",
        end: `top top+=${navTable.clientHeight + header.clientHeight + 25}`,
        pin: true,
    });
    const toggleFixedNav = () => window.outerWidth < 1024 ?  fixedNav.disable() : fixedNav.enable()
    window.addEventListener('resize', toggleFixedNav);
    window.addEventListener('load', toggleFixedNav)
    
    ScrollTrigger.create({
        trigger: "#flyBtn",
        start: "top bottom",
        endTrigger: "#footer",
        toggleClass: "active",
        end: "top bottom",
        onLeave: (self) => {
            self.trigger.classList.add("hide");
        },
        onEnterBack: (self) => {
            self.trigger.classList.remove("hide");
        },
    });
}

function hideText() {
    const spoiler = document.querySelector(".spoiler");
    const button = document.querySelector(".spoiler-button");

    if(!spoiler || !button) return;

    button.textContent = "Show more";

    function replaceText() {
        if (button.textContent === "Show more") {
            button.textContent = "Show less";
            document.querySelector(".dots").style.display = "none";
            button.style.display = "block";
        } else {
            button.textContent = "Show more";
            document.querySelector(".dots").style.display = "inline";
            button.style.display = "inline";
        }
    }

    button.addEventListener("click", function () {
        spoiler.classList.toggle("show");
        replaceText();
    });
}

function renderDateSelects() {
    getMonth();
    getYear();
    getDay();

    function getDay() {
      const monthSelect = document.getElementById("month-select");
      const yearSelect = document.getElementById("year-select");
      const daySelect = document.getElementById("day-select");
      if(!monthSelect || !yearSelect || !daySelect) return;
    
      const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
      };
    
      const populateDays = () => {
        const month = parseInt(monthSelect.value, 10);
        const year = parseInt(yearSelect.value, 10);
        const days = daysInMonth(month, year);
        const seletedValue = daySelect.value;
    
        daySelect.innerHTML = "";
    
        for (let day = 1; day <= days; day++) {
          const option = document.createElement("option");
          option.value = day;
          option.text = day;
          daySelect?.appendChild(option);
        }
    
        seletedValue
          ? (daySelect.querySelector(
              `option:nth-child(${seletedValue})`
            ).selected = true)
          : (daySelect.querySelector("option:first-child").selected = true);
      };
    
      populateDays();
    
      monthSelect.addEventListener("change", populateDays);
      yearSelect.addEventListener("change", populateDays);
    }
    
    function getMonth() {
      const select = document.getElementById("month-select");
      if(!select) return;
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    
      months.forEach((month, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.text = month;
        select?.appendChild(option);
      });
    
      select ? select.options[0].selected = true : null;
    }
    
    function getYear() {
      const select = document.getElementById("year-select");
      if(!select) return;
      const currentYear = new Date().getFullYear();
      const endYear = currentYear + 2;
      const startYear = 2000;
    
      for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        select?.appendChild(option);
      }
    
      select.querySelector(`option[value='2000']`).selected = true;
    }
}

function calcPages() {
    const calsParent = document.querySelector('.calc_steps');
    if(!calsParent) return;
    const firstBtn = document.getElementById('second_next');
    const secondBtn = document.getElementById('third_next');
    const startOverBtn = document.getElementById('start_over');
    const firstStep = document.getElementById('first_step');
    const secondStep = document.getElementById('second_step');
    const thirdStep = document.getElementById('third_step');
    const stepOne = document.getElementById('step_one');
    const stepTwo = document.getElementById('step_two');
    const amountInput = document.querySelector('#summ');
    const monthSelect = document.getElementById("month-select");
    const yearSelect = document.getElementById("year-select");
    const daySelect = document.getElementById("day-select");
    const awardEl = document.querySelector('#award');
    const interestRateEl = document.querySelector('#interestRate');
    const totalEl = document.querySelector('#total');
    const AMOUNT_REGEX = /^\d+\.?\d?(\d+)?$/;

    let monthValue = monthSelect.value;
    let yearValue = yearSelect.value;
    let dayValue = daySelect.value;
    const getInputDate = () => `${yearValue}-${+monthValue + 1}-${dayValue}`;
    let fullYear = getInputDate();
    let amountValue = '';
    let result;

    const resetCalculator = () => {
        yearSelect.querySelector(`option[value='2000']`).selected = true;
        yearValue = yearSelect.value;
        monthSelect.options[0].selected = true;
        monthValue = monthSelect.value;
        daySelect.querySelector("option:first-child").selected = true;
        dayValue = daySelect.value;
        amountInput.value = '';
        amountValue = '';
        thirdStep.classList.remove('step_show')
        firstStep.classList.add('step_show');
    }

    firstBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(!amountValue)  {
            amountInput.parentNode.classList.add('error')
            return
        };
        amountInput.parentNode.classList.remove('error')
        firstStep.classList.remove("step_show");
        secondStep.classList.add("step_show");
        stepOne.classList.remove("active_wrap");
        stepTwo.classList.add("active_wrap");
    });

    secondBtn.addEventListener("click", (e) => {
        e.preventDefault();
        secondStep.classList.remove('step_show')
        thirdStep.classList.add('step_show');
        fullYear = getInputDate();
        result = nyJudgmentInterest(+amountValue, fullYear);
        awardEl.textContent = `$${Number.parseFloat(amountValue).toFixed(2)}`;
        interestRateEl.textContent = `$${result.interest.toFixed(2)}`;
        totalEl.textContent =`$${result.totalValue.toFixed(2)}`
    })

    startOverBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetCalculator();
    })

    amountInput.addEventListener('input', (e) => {
        const targetValue = e.target.value.replace(/\$/g, '').trim();
        if(!targetValue) {
            e.target.value = '';
            amountValue = '';
            return;
        }
        if(!AMOUNT_REGEX.test(targetValue)) {
            e.target.value = `$ ${amountValue}`;
            return;
        }
        amountInput.parentNode.classList.remove('error');
        e.target.value = `$ ${targetValue}`;
        amountValue = targetValue;
    })
    monthSelect.addEventListener('change', (e) => {
        monthValue = e.target.value;
    })
    yearSelect.addEventListener('change', (e) => {
        yearValue = e.target.value;
    })
    daySelect.addEventListener('change', (e) => {
        dayValue = e.target.value;
    })
}

function nyJudgmentInterest(judgmentAmount, judgmentDate) {
    const beforeApril30Rate = 0.75; // 9% year or 0.75 per month interest rate before April 30, 2022
    const afterApril30Rate = 0.167; // 2% year or 0.167 per month interest rate after April 30, 2022
    const april30Date = new Date('2022-04-30'); // date when interest rate changes
    const today = new Date();
    const judgDate = new Date(judgmentDate)
  
    // Calculate the number of months between the judgment date and April 30, 2022
    const months =
      (today.getFullYear() - judgDate.getFullYear()) * 12 +
      (today.getMonth() - judgDate.getMonth());
  
    // Determine the interest rate based on the judgment date
    const rate = judgDate < april30Date ? beforeApril30Rate : afterApril30Rate;

    const interestRatePerMonth = judgmentAmount / 100 * rate;
    // Calculate the total interest earned
    const interest = interestRatePerMonth * months;
  
    // Calculate the total value of the judgment including interest
    const totalValue = judgmentAmount + interest;

    return { interest, totalValue };
}

function initPuzzleAnimation() {
    const header = document.querySelector("header");
    const headerHeight = header.clientHeight;
    const ww = window.innerWidth;
    const wh = window.innerHeight;
  
    initMainSection();
    initProposSection();

    function initMainSection() {
      const mainSection = document.querySelector('.main-section')
      const puzzleTopRight = mainSection.querySelector(".puzzle-top-right");
      const puzzleBottomRight = mainSection.querySelector(".puzzle-bottom-right");
      const puzzleBottomLeft = mainSection.querySelector(".puzzle-bottom-left");
      const getPosXtopRight = () => window.innerWidth / 2 - puzzleTopRight.clientWidth / 2;
  
  
      gsap.fromTo(
        puzzleTopRight,
        {
          x: 250,
        },
        { x: 0 }
      );
      gsap.fromTo(
        puzzleTopRight,
        { x: 0 },
        {
          x: () => -getPosXtopRight(),
          scrollTrigger: {
            trigger: mainSection,
            start: `top top`,
            end: `50%-=${headerHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
  
      gsap.to(puzzleBottomRight, {
          x: () => -getPosXtopRight(),
          duration: 0,
      });
      gsap.to(puzzleBottomRight, {
        y: -270,
        scrollTrigger: {
          trigger: mainSection,
          start: `top+=${headerHeight} top`,
          end: `50%-=${headerHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
  
      gsap.fromTo(
        puzzleBottomLeft,
        {
          x: -250,
        },
        { x: 0 }
      );
      gsap.fromTo(
        puzzleBottomLeft,
        { x: 0 },
        {
          x: () => getPosXtopRight(),
          scrollTrigger: {
            trigger: mainSection,
            start: `top top`,
            end: `50%-=${headerHeight}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    function initProposSection() {
        const section = document.querySelector('.propos');
        const puzzlesContainer = document.querySelector('.puzzles-container');
        const leftSide = document.querySelector('.left-side');
        const rightSide = document.querySelector('.right-side');
        const puzzleTopLeft = section.querySelector(".puzzle-top-left");
        const puzzleTopRight = section.querySelector(".puzzle-top-right");
        const puzzleBottomRight = section.querySelector(".puzzle-bottom-right");
        const puzzleBottomLeft = section.querySelector(".puzzle-bottom-left");
        const getPosXLeft = () => window.innerWidth / 2 - puzzleTopLeft.clientWidth / 2;
        const getPosYLeft = () => section.clientHeight / 2;
        const getPosXRight = () => (leftSide.clientWidth - puzzleTopLeft.clientWidth);


        gsap.fromTo(
          puzzleTopLeft,
          { x: 0 },
          {
            x: () => getPosXLeft(),
            y: () => getPosYLeft(),
            scrollTrigger: {
              trigger: section,
              start: `top bottom`,
              end: `top`,
              scrub: 1,
              invalidateOnRefresh: true,
            //   markers: true,
            },
          }
        );

        gsap.fromTo(
            puzzleBottomLeft,
            { x: 0, rotation: 0 },
            {
              x: () => getPosXLeft(),
              rotation: 0,
              scrollTrigger: {
                trigger: section,
                start: `top bottom`,
                end: `top`,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true,
              },
            }
        );

        gsap.fromTo(
            puzzleTopRight,
            { x: 0 },
            {
              x: () => -getPosXLeft(),
              // rotation: -20,
              scrollTrigger: {
                trigger: section,
                start: `top bottom`,
                end: `top`,
                scrub: 1,
                invalidateOnRefresh: true,
              //   markers: true,
              },
            }
        );

        gsap.to(puzzleBottomRight, {
            x: () => -getPosXLeft(),
            duration: 0,
        });
        gsap.fromTo(
            puzzleBottomRight,
            { y: 0 },
            {
              y: () => -getPosYLeft(),
              // rotation: -20,
              scrollTrigger: {
                trigger: section,
                start: `top+=200 bottom`,
                end: `top`,
                scrub: 1,
                invalidateOnRefresh: true,
              //   markers: true,
              },
            }
        );

        gsap.fromTo(
            puzzlesContainer,
            { rotation: 15, y: 0 },
            {
              rotation: -35,
              y: -150,
              scrollTrigger: {
                trigger: section,
                start: `top bottom`,
                end: `bottom`,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true,
              },
            }
        );
        gsap.fromTo(
            rightSide,
            { x: 0 },
            {
              x: () => -375,
              scrollTrigger: {
                trigger: section,
                start: `50%+=${headerHeight} bottom`,
                end: `bottom`,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true,
              },
            }
        );
    }
}