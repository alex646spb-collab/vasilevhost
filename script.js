// Плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const cookieBtn = document.getElementById('cookie-btn');

if (!localStorage.getItem('cookieAccepted')) {
  cookieBanner.style.display = 'block';
}

cookieBtn.addEventListener('click', () => {
  localStorage.setItem('cookieAccepted', 'true');
  cookieBanner.style.display = 'none';
});

// Модальное окно политики персональных данных
const modal = document.getElementById("policyModal");
const openBtn = document.getElementById("openPolicy");
const closeBtn = document.getElementById("closePolicy");

if (openBtn) {
  openBtn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
  }
}

if (closeBtn) {
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Анимация блока философии с волной
document.addEventListener("DOMContentLoaded", function() {
  const philosophyLists = document.querySelectorAll('#philosophy ul');

  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const listItems = entry.target.querySelectorAll('li');
        listItems.forEach((li, index) => {
          const baseDelay = index * 0.3;
          li.style.animation = `bronzeWave 1.5s ease forwards ${baseDelay}s`;
          li.style.setProperty('--line-delay', `${baseDelay + 1.0}s`);
          li.classList.add('draw-line');
        });
        waveObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  philosophyLists.forEach(list => waveObserver.observe(list));
});

// Анимация отзывов + открытие карточек
document.addEventListener("DOMContentLoaded", function() {
  const reviewCards = document.querySelectorAll('.review-card');

  const overlay = document.createElement('div');
  overlay.className = 'review-overlay';
  document.body.appendChild(overlay);

  reviewCards.forEach(card => {
    const closeBtn = document.createElement('div');
    closeBtn.className = 'review-close-btn';
    closeBtn.innerHTML = '×';
    card.appendChild(closeBtn);

    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('review-close-btn')) return;

      reviewCards.forEach(c => c.classList.remove('is-expanded'));
      this.classList.add('is-expanded');
      document.body.classList.add('modal-open');
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      card.classList.remove('is-expanded');
      document.body.classList.remove('modal-open');
    });
  });

  overlay.addEventListener('click', () => {
    reviewCards.forEach(c => c.classList.remove('is-expanded'));
    document.body.classList.remove('modal-open');
  });
});

// Обработка формы без перезагрузки
const form = document.getElementById('tg-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const msgDiv = document.getElementById('form-message');
    msgDiv.textContent = 'Спасибо! Заявка сохранена. Напишите мне также в WhatsApp или Telegram для уверенности.';
    msgDiv.style.color = '#4CAF50';
    form.reset();
  });
}

// Плавное появление галереи
document.addEventListener("DOMContentLoaded", function() {
  const galleryTarget = document.querySelector('.photo-mosaic');
  if (!galleryTarget) return;

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, 500);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  galleryObserver.observe(galleryTarget);
});

const timelineSteps = document.querySelectorAll('.timeline-step');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry,index)=>{
    if(entry.isIntersecting){
      setTimeout(()=>{
        entry.target.classList.add('show');
      }, index*200);
    }
  });
},{threshold:0.3});

timelineSteps.forEach(step=>{
  observer.observe(step);
});



document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title .letter");
  letters.forEach((letter, index) => {
    letter.style.animation = `flyIn 0.6s forwards ${index * 0.05}s`;
  });

  // Убираем blur после полной анимации
  setTimeout(() => {
    document.querySelector(".hero-title").style.filter = "blur(0)";
  }, letters.length * 50 + 600);
});



document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {

    const answer = btn.nextElementSibling;

    document.querySelectorAll(".faq-answer").forEach(item => {
      if(item !== answer){
        item.style.maxHeight = null;
      }
    });

    if(answer.style.maxHeight){
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

  });
});

const faqQuestions = document.querySelectorAll(".faq-question");

const faqObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry,index) => {

    if(entry.isIntersecting){

      setTimeout(()=>{
        entry.target.classList.add("show");
      }, index * 250);

    }

  });
},{threshold:0.3});

faqQuestions.forEach(q=>{
  faqObserver.observe(q);
});


document.addEventListener("DOMContentLoaded", function() {

  const faqQuestions = document.querySelectorAll(".faq-question");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry,index)=>{

      if(entry.isIntersecting){

        setTimeout(()=>{
          entry.target.classList.add("show");
        }, index * 300);

      }

    });

  }, { threshold: 0.3 });

  faqQuestions.forEach(q=>{
    observer.observe(q);
  });

});

    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,  // отступ от шапки
      behavior: 'smooth'
    });
  });
});
// Анимация появления элементов при скролле
document.addEventListener("DOMContentLoaded", () => {

  const animatedElements = document.querySelectorAll(
    ".timeline-step, .faq-question"
  );

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry,index)=>{
      if(entry.isIntersecting){

        setTimeout(()=>{
          entry.target.classList.add("show");
        }, index * 200);

      }
    });
  },{threshold:0.3});

  animatedElements.forEach(el=>{
    observer.observe(el);
  });

});
