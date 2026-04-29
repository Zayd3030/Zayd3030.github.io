/* ============================================================
   MAIN.JS
   Nav scroll · Intersection Observer reveals · Stats count-up
   Hero on-load sequence · Active nav link tracking
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     NAV — background on scroll
  ---------------------------------------------------------- */
  const siteHeader = document.getElementById('site-header');

  function updateNav() {
    if (window.scrollY > 20) {
      siteHeader.classList.add('nav--scrolled');
    } else {
      siteHeader.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load in case page is already scrolled


  /* ----------------------------------------------------------
     NAV — active link tracking via scroll position
  ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('main section[id]');

  function setActiveNavLink() {
    let currentId = '';
    const scrollMid = window.scrollY + window.innerHeight / 3;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollMid) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();


  /* ----------------------------------------------------------
     MOBILE NAV — hamburger toggle
  ---------------------------------------------------------- */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }


  /* ----------------------------------------------------------
     HERO ON-LOAD SEQUENCE
     Each element gets .is-loaded after its delay, triggering
     the opacity + translateY transition defined in main.css
  ---------------------------------------------------------- */
  const heroSequence = [
    { selector: '.hero__badge',    delay: 100  },
    { selector: '.hero__name',     delay: 200  },
    { selector: '.hero__bio',      delay: 350  },
    { selector: '.hero__ctas',     delay: 500  },
    { selector: '.hero__terminal', delay: 400  },
    { selector: '.stats-bar',      delay: 600  },
  ];

  heroSequence.forEach(function (item) {
    const el = document.querySelector(item.selector);
    if (!el) return;
    el.classList.add('hero-animate');
    setTimeout(function () {
      el.classList.add('is-loaded');
    }, item.delay);
  });


  /* ----------------------------------------------------------
     INTERSECTION OBSERVER — scroll reveals
     Watches .reveal and .reveal--stagger elements.
     Adds .is-visible once they enter the viewport.
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal--stagger').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ----------------------------------------------------------
     SECTION HEADER AUTO-REVEAL
     Section labels + headings animate in automatically without
     needing to add .reveal manually in every section.
  ---------------------------------------------------------- */
  const sectionHeaderObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionHeaderObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.section__header').forEach(function (el) {
    el.classList.add('reveal');
    sectionHeaderObserver.observe(el);
  });


  /* ----------------------------------------------------------
     EXPERIENCE CARDS — stagger reveal
  ---------------------------------------------------------- */
  const expCards = document.querySelectorAll('.experience-card__content');

  if (expCards.length) {
    const expObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            expObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    expCards.forEach(function (card, i) {
      card.classList.add('reveal');
      card.style.transitionDelay = i * 100 + 'ms';
      expObserver.observe(card);
    });
  }


  /* ----------------------------------------------------------
     PROJECT CARDS — stagger reveal
  ---------------------------------------------------------- */
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length) {
    const projectObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            projectObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    projectCards.forEach(function (card, i) {
      card.classList.add('reveal');
      card.style.transitionDelay = (i % 3) * 80 + 'ms'; // stagger per row
      projectObserver.observe(card);
    });
  }


  /* ----------------------------------------------------------
     STATS COUNT-UP
     Reads data-count attribute, animates from 0 to target.
     Preserves any suffix (+, %, etc.) from original text.
  ---------------------------------------------------------- */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCount(el) {
    const target   = parseInt(el.dataset.count, 10);
    const original = el.textContent.trim();
    const suffix   = original.replace(/[\d,]/g, ''); // captures "+", "%", etc.
    const duration = target > 1000 ? 1800 : 1200;    // longer for years
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix; // ensure exact final value
      }
    }

    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stats-bar__number[data-count]').forEach(function (el) {
    statsObserver.observe(el);
  });

  // Also watch business stats if they have data-count
  document.querySelectorAll('.business__stat-number[data-count]').forEach(function (el) {
    statsObserver.observe(el);
  });


  /* ----------------------------------------------------------
     TERMINAL TYPING ANIMATION
     Lines are typed character-by-character into #terminal-body.
     The cursor sits at the end of the current line and blinks
     between lines. Typing starts once the terminal widget has
     faded in (400ms hero delay + small buffer).
  ---------------------------------------------------------- */
  var TERMINAL_LINES = [
    { text: 'zayd@portfolio:~$ whoami',              type: 'prompt'  },
    { text: 'Zayd Hussain, Software Engineer',       type: 'output'  },
    { text: '',                                       type: 'blank'   },
    { text: 'zayd@portfolio:~$ cat about.txt',       type: 'prompt'  },
    { text: 'CS Student · Co-founder · Builder',     type: 'output'  },
    { text: 'Open to: Internships | Grad Roles',     type: 'output'  },
    { text: '',                                       type: 'blank'   },
    { text: 'zayd@portfolio:~$ ls skills/',          type: 'prompt'  },
    { text: 'Python  JS  TypeScript  PHP  Java  C#', type: 'output'  },
    { text: '',                                       type: 'blank'   },
    { text: 'zayd@portfolio:~$',                     type: 'prompt'  },
  ];

  /* ms per character for each line type */
  var CHAR_SPEED = {
    prompt: 38,
    output: 22,
    blank:  0,
  };

  /* pause after a line completes before starting the next */
  var LINE_PAUSE = {
    prompt: 180,
    output: 80,
    blank:  260,
  };

  var terminalBody = document.getElementById('terminal-body');

  function runTerminal() {
    if (!terminalBody) return;

    var lineIndex  = 0;
    var charIndex  = 0;
    var currentSpan = null;
    var cursorEl    = null;

    /* Create the persistent cursor element once */
    cursorEl = document.createElement('span');
    cursorEl.className = 'terminal__cursor';
    cursorEl.setAttribute('aria-hidden', 'true');

    function createLineSpan(lineObj) {
      var span = document.createElement('span');
      span.className = 'terminal__line';

      if (lineObj.type === 'prompt') {
        span.classList.add('terminal__line--prompt');
      } else if (lineObj.type === 'output') {
        span.classList.add('terminal__line--output');
      }

      /* blank lines get a newline so they take up vertical space */
      if (lineObj.type === 'blank') {
        span.textContent = ' '; // non-breaking space preserves line height
      }

      return span;
    }

    function typeLine() {
      if (lineIndex >= TERMINAL_LINES.length) {
        /* All lines done — leave cursor blinking at the end */
        if (currentSpan) currentSpan.appendChild(cursorEl);
        return;
      }

      var lineObj = TERMINAL_LINES[lineIndex];

      /* Blank lines: insert immediately, no typing needed */
      if (lineObj.type === 'blank') {
        var blankSpan = createLineSpan(lineObj);
        terminalBody.appendChild(blankSpan);
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, LINE_PAUSE.blank);
        return;
      }

      /* First character of a new line — create the span and add the cursor */
      if (charIndex === 0) {
        currentSpan = createLineSpan(lineObj);
        terminalBody.appendChild(currentSpan);
        currentSpan.appendChild(cursorEl); // cursor at end of empty line
      }

      var full    = lineObj.text;
      var speed   = CHAR_SPEED[lineObj.type] || 30;

      if (charIndex < full.length) {
        /* Insert next character just before the cursor */
        var textNode = document.createTextNode(full[charIndex]);
        currentSpan.insertBefore(textNode, cursorEl);
        charIndex++;
        setTimeout(typeLine, speed);
      } else {
        /* Line complete — pause, then start next line */
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, LINE_PAUSE[lineObj.type] || 100);
      }
    }

    /* Start after the terminal widget has faded in */
    setTimeout(typeLine, 620);
  }

  runTerminal();

})();
