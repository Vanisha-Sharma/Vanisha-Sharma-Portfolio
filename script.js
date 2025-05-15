document.addEventListener('DOMContentLoaded', function() {
  const currentYear = document.getElementById('current-year');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.right ul');
  const contactForm = document.getElementById('contactForm');
  const skillBars = document.querySelectorAll('.linear-skill-progress');
  
  function isElementInViewport(el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  }

  function showError(input, message) {
      const formGroup = input.closest('.form-group');
      const errorElement = formGroup.querySelector('.error-message');
      formGroup.classList.add('invalid');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  }

  if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
  }

  if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('active');
          this.textContent = isExpanded ? '☰' : '✕';
      });

      document.addEventListener('click', function(e) {
          if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
              menuToggle.setAttribute('aria-expanded', 'false');
              navMenu.classList.remove('active');
              menuToggle.textContent = '☰';
          }
      });

      document.querySelectorAll('.right ul li a').forEach(link => {
          link.addEventListener('click', function() {
              menuToggle.setAttribute('aria-expanded', 'false');
              navMenu.classList.remove('active');
              menuToggle.textContent = '☰';
          });
      });

      document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && navMenu.classList.contains('active')) {
              menuToggle.setAttribute('aria-expanded', 'false');
              navMenu.classList.remove('active');
              menuToggle.textContent = '☰';
              menuToggle.focus();
          }
      });
  }
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          document.querySelectorAll('.error-message').forEach(el => {
              el.style.display = 'none';
          });
          document.querySelectorAll('.form-group').forEach(el => {
              el.classList.remove('invalid');
          });

          let isValid = true;
          const name = document.getElementById('name');
          const email = document.getElementById('email');
          const phone = document.getElementById('phone');
          const message = document.getElementById('message');

          if (!name.value.trim()) {
              showError(name, 'Name is required');
              isValid = false;
          }

          if (!email.value.trim()) {
              showError(email, 'Email is required');
              isValid = false;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
              showError(email, 'Please enter a valid email');
              isValid = false;
          }

          if (!phone.value.trim()) {
              showError(phone, 'Phone number is required');
              isValid = false;
          }

          if (!message.value.trim()) {
              showError(message, 'Message is required');
              isValid = false;
          }

          if (isValid) {
              const successMessage = document.getElementById('successMessage');
              successMessage.textContent = 'Message sent successfully!';
              successMessage.style.display = 'block';
              
              contactForm.reset();
              
              setTimeout(() => {
                  successMessage.style.display = 'none';
              }, 5000);
          }
      });
  }
  if (skillBars.length > 0) {
      skillBars.forEach(bar => {
          if (!bar.style.width) {
              const percentText = bar.closest('.linear-skill-item').querySelector('.skill-percent').textContent;
              const percentValue = parseInt(percentText);
              bar.style.width = `${percentValue}%`;
          }
      });

      const animateSkillBars = () => {
          skillBars.forEach(bar => {
              const finalWidth = bar.style.width;
              bar.style.width = '0';
              setTimeout(() => {
                  bar.style.width = finalWidth;
              }, 100);
          });
      };

      const skillsSection = document.querySelector('.skillsSection');
      if (skillsSection && isElementInViewport(skillsSection)) {
          animateSkillBars();
      } else {
          const scrollHandler = function() {
              if (skillsSection && isElementInViewport(skillsSection)) {
                  animateSkillBars();
                  window.removeEventListener('scroll', scrollHandler);
              }
          };
          window.addEventListener('scroll', scrollHandler);
      }
  }

  
  }
);