// toc-scroll-spy.js
// Handles highlighting the active section in the "On This Page" navigation

(function() {
  'use strict';
  
  function initScrollSpy() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) {
      // Retry after a short delay (React components might still be mounting)
      setTimeout(initScrollSpy, 100);
      return;
    }
    
    const links = document.querySelectorAll('.toc-link');
    const headings = document.querySelectorAll('h2[id], h3[id], h4[id]');
    
    if (!links.length || !headings.length) return;
    
    function updateActiveLink() {
      const scrollPos = window.scrollY + 150;
      let current = '';
      
      headings.forEach(function(heading) {
        const top = heading.offsetTop;
        if (scrollPos >= top) {
          current = heading.id;
        }
      });
      
      if (current) {
        links.forEach(function(link) {
          link.classList.remove('active');
          
          if (link.getAttribute('data-toc-link') === current) {
            link.classList.add('active');
          }
        });
      }
    }
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initial update
    updateActiveLink();
  }
  
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }
  
  // Re-initialize on Astro page transitions
  document.addEventListener('astro:page-load', initScrollSpy);
  
})();