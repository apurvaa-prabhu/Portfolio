// Toggle the navigation menu (hamburger)
function toggleMenu() {
  var navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('open');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Filter projects by category
function filterProjects(category) {
  var cards = document.querySelectorAll('.project-card');
  cards.forEach(function(card) {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Lightbox - open image in modal
function openLightbox(src, alt) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
}

// Lightbox - close modal
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
}

// Attach lightbox to project images
document.querySelectorAll('.project-card img').forEach(function(img) {
  img.addEventListener('click', function() {
    openLightbox(this.src, this.alt);
  });
});

// Form validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var status = document.getElementById('form-status');

  if (!name || !email || !message) {
    status.style.color = 'red';
    status.textContent = 'Please fill in all required fields.';
    return;
  }

  status.style.color = 'green';
  status.textContent = 'Message sent successfully!';
  this.reset();
});
