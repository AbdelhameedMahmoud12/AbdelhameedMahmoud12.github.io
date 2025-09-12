document.addEventListener("DOMContentLoaded", function () {
  // Portfolio filter
  const filterButtons = document.querySelectorAll('.filter-item');
  const posts = document.querySelectorAll('.post');

  if (filterButtons.length && posts.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        posts.forEach(post => {
          if (filter === 'all' || post.classList.contains(filter)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      });
    });
  }

  // Sticky navbar
  const navbar = document.getElementById('navbar-top');
  if (navbar) {
    const navbar_height = navbar.offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('fixed-top');
          document.body.style.paddingTop = navbar_height + 'px';
        } else {
          navbar.classList.remove('fixed-top');
          document.body.style.paddingTop = '0';
        } 
    });
  }

  // Back to top button
  const backToTopButton = document.getElementById("btn-back-to-top");

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
});
