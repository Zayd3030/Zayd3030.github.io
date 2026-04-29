/* ============================================================
   FILTER.JS
   Project category filter · Skills category filter
   Each section is self-contained — tabs only affect their
   own sibling grid.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Generic filter factory
     Wires up a set of tabs to a set of filterable items within
     a shared parent section.

     tabSelector   — CSS selector for the tab buttons
     itemSelector  — CSS selector for the filterable items
     parent        — the section element that contains both
  ---------------------------------------------------------- */
  function initFilter(tabSelector, itemSelector, parent) {
    const tabs  = parent.querySelectorAll(tabSelector);
    const items = parent.querySelectorAll(itemSelector);

    if (!tabs.length || !items.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const filter = tab.dataset.filter;

        /* --- Update active tab --- */
        tabs.forEach(function (t) {
          t.classList.remove('filter-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('filter-tab--active');
        tab.setAttribute('aria-selected', 'true');

        /* --- Show / hide items --- */
        items.forEach(function (item) {
          const category = item.dataset.category;
          const visible  = filter === 'all' || category === filter;

          if (visible) {
            item.removeAttribute('hidden');
            /* Ensure revealed items are visually shown even if
               the Intersection Observer already fired while hidden */
            requestAnimationFrame(function () {
              item.classList.add('is-visible');
            });
          } else {
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------
     Projects filter
  ---------------------------------------------------------- */
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    initFilter('.filter-tab', '.project-card', projectsSection);
  }

  /* ----------------------------------------------------------
     Skills filter
  ---------------------------------------------------------- */
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    initFilter('.filter-tab', '.skill-group', skillsSection);
  }

})();
