/**
* Template Name: MyResume - v4.7.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function () {
  "use strict";
  let currentLanguage = localStorage.getItem("lang") || "en";
  let typedInstance;

  // Make it global so inline onclick can access it
  window.setLanguage = function (lang) {
    currentLanguage = lang;
    localStorage.setItem("lang", lang);
    renderPortfolio();
  }
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  // =======================
  // SET LANGUAGE
  // =======================
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("lang", lang);

    renderPortfolio();
    renderHero();
    highlightActiveLangButton();
    renderAbout();
    renderSkills();
    renderPortfolioText();
    renderFooter();
    refreshPortfolio();
    renderEducation();
    renderExp();

    // 1. ПРЕМАХВАМЕ ФОКУСА (Критично за Accessibility грешката)
    // Това освобождава асистиращите технологии преди промяната на съдържанието
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 2. ЗАПАЗВАМЕ ТЕКУЩОТО СЪСТОЯНИЕ
    currentLanguage = lang;
    localStorage.setItem("lang", lang);

    // Запазваме филтъра, за да знаем коя категория да отворим след рефреша
    const activeFilter = document.querySelector('#portfolio-flters .filter-active');
    if (activeFilter) {
      localStorage.setItem("activeFilter", activeFilter.getAttribute('data-filter'));
    }

    // 3. ПРЕЗАРЕЖДАМЕ СТРАНИЦАТА
    // Всичко под този ред няма да се изпълни веднага, а ще се случи 
    // в DOMContentLoaded след презареждането.
    window.location.href = window.location.pathname + "?v=" + Date.now();
  }

  // =======================
  // HIGHLIGHT ACTIVE BUTTON
  // =======================
  function highlightActiveLangButton() {
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
  }

  // =======================
  // RENDER HERO
  // =======================
  function renderHero() {
    const heroName = document.getElementById("hero-name");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const typedContainer = document.getElementById("typed-container");
    const portfolioButton = document.getElementById("see-work");

    if (!heroName || !heroSubtitle || !typedContainer || !portfolioButton) return;

    // Update static texts
    heroName.textContent = heroText[currentLanguage].name;
    heroSubtitle.textContent = heroText[currentLanguage].hero_im;
    portfolioButton.textContent = heroText[currentLanguage].see_work;

    const newStrings = heroText[currentLanguage].typed_items.split(", ");

    // Destroy previous Typed.js instance if it exists
    if (typedInstance) {
      typedInstance.destroy();     // stop typing
      typedInstance = null;        // remove reference
    }

    // Clear container before initializing
    typedContainer.innerHTML = "";

    // Use a short timeout to ensure DOM is ready (prevents flicker)
    setTimeout(() => {
      typedInstance = new Typed(typedContainer, {
        strings: newStrings,
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }, 10); // 10ms delay is enough
  }

  // =======================
  // ABOUT HERO
  // =======================
  function renderAbout() {
    const lang = currentLanguage; // 'en' or 'bg'
    const data = heroText[lang]; // Assuming your data object is named heroText

    // Helper function to safely update text
    const updateText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = text;
    };

    // Update Section Headings
    updateText("about-title", data.about_title);
    updateText("about-categ", data.about_categ);

    // Update Labels (The Bold text)
    updateText("about-label-birthday", data.about_degree_birth + ":");
    updateText("about-label-phone", data.about_degree_phone + ":");
    updateText("about-label-city", data.about_city_text + ":");
    updateText("about-label-degree", data.about_degree + ":");
    updateText("about-label-email", data.about_degree_email + ":");
    updateText("about-label-freelance", data.about_free + ":");

    // Update Values (The specific info)
    updateText("about-city-value", data.about_city);
    updateText("about-degree-value", data.about_degree_type);
    updateText("about-freelance-value", data.about_free_type);

    // Update Main Bio (using innerHTML to support <br> tags)
    updateText("about-main-text", data.about_main_text);
  }

  // =======================
  // SKILLS PORTFOLIO
  // =======================
  function renderSkills() {
    const lang = currentLanguage;
    const data = heroText[lang];

    const skillsTitle = document.getElementById("skills-title");
    if (skillsTitle) {
      skillsTitle.textContent = data.skills_title;
    }
  }

  // =======================
  // RENDER EDUCATION
  // =
  function renderEducation() {
    const lang = currentLanguage;
    const data = heroText[lang];

    const master_title = document.getElementById("master-school");
    const master_desc = document.getElementById("master-desc");
    const bachelor_title = document.getElementById("bachelor-school");
    const bachelor_desc = document.getElementById("bachelor-desc");
    const school_title = document.getElementById("school-title");
    const school_desc = document.getElementById("school-desc");
    const education_title = document.getElementById("Education-title");

    if (master_title) master_title.textContent = data.master_title;
    if (master_desc) master_desc.textContent = data.master_info;
    if (bachelor_title) bachelor_title.textContent = data.bachelor_title;
    if (bachelor_desc) bachelor_desc.textContent = data.bachelor_info;
    if (school_title) school_title.textContent = data.school_title;
    if (school_desc) school_desc.textContent = data.school_info;
    if (education_title) education_title.textContent = data.education_title;
  }

  // =======================
  // RENDER EXPERIENCE
  // =
  function renderExp() {
    const lang = currentLanguage;
    const data = heroText[lang];



    const exp_title = document.getElementById("exp_title");
    const exp_one_title = document.getElementById("exp_one_title");
    const exp_one_company = document.getElementById("exp_one_company");
    const exp_two_title = document.getElementById("exp_two_title");
    const exp_two_company = document.getElementById("exp_two_company");
    const exp_three_title = document.getElementById("exp_three_title");
    const exp_three_company = document.getElementById("exp_three_company");
    const exp_four_title = document.getElementById("exp_four_title");
    const exp_four_company = document.getElementById("exp_four_company");
    const exp_five_title = document.getElementById("exp_five_title");
    const exp_five_company = document.getElementById("exp_five_company");

    if (exp_title) exp_title.textContent = data.exp_title;
    if (exp_one_title) exp_one_title.textContent = data.exp_one_title;
    if (exp_one_company) exp_one_company.textContent = data.exp_one_company;
    if (exp_two_title) exp_two_title.textContent = data.exp_two_title;
    if (exp_two_company) exp_two_company.textContent = data.exp_two_company;
    if (exp_three_title) exp_three_title.textContent = data.exp_three_title;
    if (exp_three_company) exp_three_company.textContent = data.exp_three_company;
    if (exp_four_title) exp_four_title.textContent = data.exp_four_title;
    if (exp_four_company) exp_four_company.textContent = data.exp_four_company;

    if (exp_five_title) exp_five_title.textContent = data.exp_five_title;
    if (exp_five_company) exp_five_company.textContent = data.exp_five_company;
  }

  // =======================
  // RENDER PORTFOLIO
  // =======================
  function renderPortfolio() {
    const cardContainer = document.getElementById("card-grid");
    if (!cardContainer) return;

    // 1. ЗАПАЗВАМЕ ТЕХНИЧЕСКИЯ СЕЛЕКТОР (напр. ".filter-ux")
    // Взимаме го директно от атрибута, за да не зависим от преведения текст на бутона
    const activeBtn = document.querySelector('#portfolio-flters .filter-active');
    const savedFilter = activeBtn ? activeBtn.getAttribute('data-filter') : '*';

    // 2. УНИЩОЖАВАМЕ СТАРИЯ ИНСТАНС (Hard Reset)
    // Това гарантира, че Isotope няма да търси "старите" английски елементи
    if (typeof jQuery !== 'undefined' && jQuery.fn.isotope) {
      const $grid = jQuery(cardContainer);
      if ($grid.data('isotope')) {
        $grid.isotope('destroy');
      }
    }

    // 3. ГЕНЕРИРАМЕ НОВИЯ HTML
    let portfolioHTML = "";
    projectData
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .forEach(project => {
        const filterClass = categoryMap[project.category.en] || "filter-app";

        portfolioHTML += `
      <div class="col-lg-6 col-md-6 portfolio-item ${filterClass} box-shadow">
        <div class="inside-card h-100">
          <div class="portfolio-wrap">
            <img src="${project.image}" class="img-fluid" alt="${project.title[currentLanguage]}">
          </div>
          <div class="project-card d-flex flex-column h-100">
            <h3><strong>${project.title[currentLanguage]}</strong></h3>
            <p class="project-description">${project.description[currentLanguage]}</p>
            
            <p class="project-meta">
              <strong>${currentLanguage === 'bg' ? 'Фокус:' : 'Focus:'}</strong>
              
              <span class="category-container">
                ${project.category[currentLanguage].split(' · ').map(cat =>
          `<span class="category-tag">${cat.trim()}</span>`
        ).join('')}
              </span>
            </p>
            <p class="project-tools">
              ${project.tools[currentLanguage].split(' · ').map(tool =>
          `<span class="tool-tag">${tool.trim()}</span>`
        ).join('')}
            </p>
            <hr>
            <div class="portfolio-links mt-auto d-flex justify-content-between align-items-center pt-2">

    

              <!-- Primary CTA button -->
              <a href="#project-${project.id}" 
                class="portfolio-lightbox btn-main" 
                data-glightbox="type: inline;">
                ${currentLanguage === 'bg' ? 'Разгледай проекта →' : 'View Project →'}
              </a>

            </div>
          </div>
        </div>
      </div>

      <!-- hidden inline content for modal -->

      <div class="card-show" id="project-${project.id}" style="display:none;">

        <div class="lightbox-content">

          <header class="case-header">

            <h2>${project.title[currentLanguage]}</h2>

            <p class="case-intro">${project.description[currentLanguage]}</p>

          </header>


          <figure class="case-hero">

            <img src="${project.image}" alt="${project.title[currentLanguage]}">
            
            ${project.video ? `
              <div style="padding-bottom:10px;">
                <i class="fab fa-youtube" style="color:red;font-size:16px;"></i>
                <a href="${project.video}" target="_blank" rel="noopener">
                  Watch Video
                </a>
              </div>
            ` : ''}

            ${project.link ? `
              <div style="padding-bottom:10px;">
                <i class="fas fa-file-word" style="color:red;font-size:16px;"></i>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                  Live Project | Design Prototype
                </a>
              </div>
            ` : ''}
            
          </figure>

          

          <h3><strong>${currentLanguage === 'bg' ? 'ПРЕДИЗВИКАТЕЛСТВО:' : 'PROBLEM:'}</strong></h3>

          <div><p>${project.problem[currentLanguage]}</p></div>

          <hr>

          <h3><strong>${currentLanguage === 'bg' ? 'РОЛЯ И ОТГОВОРНОСТИ:' : 'ROLE & RESPONSIBILITIES:'}</strong></h3>

          <div><p>${project.role[currentLanguage]}</p></div>

          <hr>

          <h3><strong>${currentLanguage === 'bg' ? 'ПРОЦЕС:' : 'PROCESS:'}</strong></h3>

          <div><p>${project.process[currentLanguage]}</p></div>

          <hr>

          <h3><strong>${currentLanguage === 'bg' ? 'РЕЗУЛТАТ И НАУЧЕНИ УРОЦИ:' : 'OUTCOME & LEARNINGS:'}</strong></h3>

          <div><p>${project.outcome[currentLanguage]}</p></div>

          <hr>


          <section class="case-meta">

            <p><strong>Category:</strong> ${project.category[currentLanguage]}</p>

            <p><strong>Tools:</strong> ${project.tools[currentLanguage]}</p>

          </section>

        </div>

      </div> 
        
      `;


      });
    cardContainer.innerHTML = portfolioHTML;

    // 4. РЕСТАРТИРАМЕ LIGHTBOX
    const portfolioLightbox = GLightbox({ selector: '.portfolio-lightbox' });


  }

  // =======================
  // PortfolioText PORTFOLIO
  // =======================
  function renderPortfolioText() {
    const lang = currentLanguage;
    const data = heroText[lang];

    const updateText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    // Заглавие и подзаглавие
    updateText("portfolio-title", data.portfolio_title);
    updateText("portfolio-text", data.portfolio_title_text);

    // Филтри
    updateText("filter-all", data.portfolio_title_cat_one);
    updateText("filter-branding", data.portfolio_title_cat_two);
    updateText("filter-motion", data.portfolio_title_cat_three);
    updateText("filter-uiux", data.portfolio_title_cat_four);
    updateText("filter-concept", data.portfolio_title_cat_five);
  }

  // =======================
  // Footer PORTFOLIO
  // =======================
  function renderFooter() {
    const lang = currentLanguage;
    const data = heroText[lang];

    const footerName = document.getElementById("footer-name");
    const footerContact = document.getElementById("footer-contact-text");

    if (footerName) footerName.textContent = data.name;
    if (footerContact) footerContact.textContent = data.footer_text;
  }

  function refreshPortfolio() {
    const container = document.querySelector('.portfolio-container'); // Проверете дали това е вашият клас
    if (container) {
      // Ако използвате Isotope
      const iso = new Isotope(container);
      iso.layout();

      // Малко закъснение е необходимо, за да може DOM да отрази промените в текста
      setTimeout(() => {
        iso.layout();
      }, 300);
    }
  }
  function changeLanguage(lang) {
    currentLanguage = lang;

    // Намираме текущо активния филтър от бутоните
    const activeFilter = document.querySelector('#portfolio-flters .filter-active');
    const currentFilterSelector = activeFilter ? activeFilter.getAttribute('data-filter') : '*';

    // Рендираме портфолиото с новия език
    renderPortfolio(currentFilterSelector);
  }

  // =======================
  // INIT ON DOM LOAD
  // =======================
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    const savedFilter = localStorage.getItem("activeFilter") || "*";
    currentLanguage = savedLang;

    // 1. Рендираме всичко
    renderPortfolio();
    renderHero();
    highlightActiveLangButton();
    renderAbout();
    renderSkills();
    renderPortfolioText();
    renderFooter();
    renderEducation();
    renderExp();

    // 2. СИНХРОНИЗАЦИЯ НА БУТОНИТЕ
    // Намираме всички бутони в менюто и маркираме активния според savedFilter
    const filterButtons = document.querySelectorAll('#portfolio-flters li');
    filterButtons.forEach(btn => {
      btn.classList.remove('filter-active');
      if (btn.getAttribute('data-filter') === savedFilter) {
        btn.classList.add('filter-active');
      }
    });

    // 3. ИНИЦИАЛИЗАЦИЯ НА ISOTOPE
    setTimeout(() => {
      const portfolioContainer = document.querySelector('.portfolio-container');
      if (portfolioContainer && typeof Isotope !== 'undefined') {

        // Създаваме инстанцията директно с филтъра
        const iso = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'masonry',
          filter: savedFilter // Това казва кои да се виждат
        });

        // Подсигуряваме подредбата след зареждане на картинките
        if (typeof imagesLoaded !== 'undefined') {
          imagesLoaded(portfolioContainer, () => {
            iso.layout();
          });
        }

        // Важно: Трябва да добавим клик събитията за бутоните СЛЕД рефреша
        filterButtons.forEach(btn => {
          btn.addEventListener('click', function () {
            filterButtons.forEach(li => li.classList.remove('filter-active'));
            this.classList.add('filter-active');
            iso.arrange({ filter: this.getAttribute('data-filter') });
            // Запазваме новия избор, ако потребителят реши пак да смени езика
            localStorage.setItem("activeFilter", this.getAttribute('data-filter'));
          });
        });
      }

      // Автоматично скролване (ако има котвата #portfolio)
      if (window.location.hash === "#portfolio") {
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 600);

    // Bind language buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
  });

})()