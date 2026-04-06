$(function () {
  // Mobile menu
  $(".menu-btn").on("click", function () {
    $(".nav-links").toggleClass("open");
  });

  // Active link by page
  const page = $("body").data("page");
  $(`.nav-links a[data-page="${page}"]`).addClass("active");

  // Smooth scroll for internal anchors
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 90 }, 700);
    }
  });

  // Typing effect on home page
  const typedEl = $("#typed");
  if (typedEl.length) {
    const texts = [
      "Développement Web",
      "Réseaux & Systèmes",
      "Data Science",
      "Cloud Computing",
      "Linux Administration"
    ];
    let i = 0;
    let j = 0;
    let deleting = false;

    setInterval(() => {
      const current = texts[i];
      if (!deleting) {
        j++;
        typedEl.text(current.substring(0, j));
        if (j === current.length) {
          deleting = true;
        }
      } else {
        j--;
        typedEl.text(current.substring(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % texts.length;
        }
      }
    }, 90);
  }

  // Reveal animations
  const revealItems = $(".reveal");
  function revealOnScroll() {
    const windowBottom = $(window).scrollTop() + $(window).height() * 0.92;
    revealItems.each(function () {
      const elTop = $(this).offset().top;
      if (elTop < windowBottom) $(this).addClass("visible");
    });
  }
  revealOnScroll();
  $(window).on("scroll", revealOnScroll);

  // Animated counters
  const counters = $("[data-count]");
  if (counters.length) {
    let counted = false;
    function animateCounters() {
      const sectionTop = counters.first().offset().top - $(window).height();
      if (!counted && $(window).scrollTop() > sectionTop) {
        counted = true;
        counters.each(function () {
          const el = $(this);
          const target = parseInt(el.data("count"), 10);
          $({ value: 0 }).animate(
            { value: target },
            {
              duration: 1600,
              step: function (now) {
                el.text(Math.floor(now) + (el.data("suffix") || ""));
              }
            }
          );
        });
      }
    }
    animateCounters();
    $(window).on("scroll", animateCounters);
  }

  // Skills bars animation
  const skillBars = $(".skill-fill");
  if (skillBars.length) {
    let skillAnimated = false;
    function animateSkills() {
      const top = skillBars.first().offset().top - $(window).height();
      if (!skillAnimated && $(window).scrollTop() > top) {
        skillAnimated = true;
        skillBars.each(function () {
          const width = $(this).data("width");
          $(this).css("width", width);
        });
      }
    }
    animateSkills();
    $(window).on("scroll", animateSkills);
  }

  // Project filtering
  const filterBtns = $(".filter-btn");
  const projectCards = $(".project-card");
  filterBtns.on("click", function () {
    const filter = $(this).data("filter");
    filterBtns.removeClass("active");
    $(this).addClass("active");

    projectCards.each(function () {
      const category = $(this).data("category");
      if (filter === "all" || filter === category) {
        $(this).fadeIn(220);
      } else {
        $(this).fadeOut(160);
      }
    });
  });

  // FAQ accordion
  $(".faq-q").on("click", function () {
    const answer = $(this).next(".faq-a");
    $(".faq-a").not(answer).slideUp(200);
    answer.slideToggle(200);
  });

  // Scroll shadow for header
  const topbar = $(".topbar");
  function headerShadow() {
    if ($(window).scrollTop() > 20) topbar.addClass("scrolled");
    else topbar.removeClass("scrolled");
  }
  headerShadow();
  $(window).on("scroll", headerShadow);
});
