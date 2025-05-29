// initializing AOS library
AOS.init({
  duration: 1000,
  offset: 50,
});
AOS.refreshHard();

// Navbar fade in after intro
window.addEventListener('load', () => {
  const navbar = document.querySelector('.navbar');
  setTimeout(() => {
    navbar.style.opacity = 0;
    navbar.style.transition = "opacity 1s ease";
    navbar.style.opacity = 1;
  }, 2000);
});

// Prevent auto-scroll if user interacts first
let userHasScrolled = false;
window.addEventListener('scroll', () => {
  userHasScrolled = true;
});

// Show intro and scroll only if user hasn't scrolled
setTimeout(() => {
  document.getElementById('intro').style.display = 'block';
  if (!userHasScrolled) {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }
}, 4000);

setTimeout(() => {
  document.getElementById('intro').style.display = 'none';
  document.querySelector('.navbar').style.display = 'block';
  if (!userHasScrolled) {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }
}, 4500);

// Section reveal animation
function revealOnScroll() {
  const fadeElems = document.querySelectorAll('.fade-slide-up');
  const triggerPoint = window.innerHeight * 0.85;
  fadeElems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Staggered reveal for cert cards
window.addEventListener('scroll', () => {
  document.querySelectorAll('.card-cert').forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 150);
    }
  });
});

// Masonry + Modal
document.addEventListener("DOMContentLoaded", () => {
  new Masonry('#certGrid', {
    itemSelector: '.col-sm-6',
    percentPosition: true
  });

  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalCertImg');

  document.querySelectorAll('.card-cert').forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      modalImg.src = imgSrc;
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    });
  });
});

// Intersection Observer for fade-slide-up
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-slide-up').forEach(el => observer.observe(el));
