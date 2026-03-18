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
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // Останавливаем перезагрузку страницы
      
      const msgDiv = document.getElementById('form-message');
      msgDiv.textContent = 'Отправка заявки...';
      msgDiv.style.color = '#e8eaed';
      msgDiv.style.marginTop = '15px';

      // Собираем данные из полей
      const formData = new FormData(form);

      try {
        // Отправляем данные в наш защищенный PHP-файл
        const response = await fetch('send.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          msgDiv.textContent = 'Спасибо! Заявка успешно отправлена. Скоро свяжусь с вами!';
          msgDiv.style.color = '#C5A059'; // Бронзовый цвет
          form.reset(); // Очищаем форму
        } else {
          throw new Error('Ошибка при отправке');
        }
      } catch (error) {
        // Если сервер недоступен
        msgDiv.textContent = 'Произошла ошибка. Пожалуйста, напишите мне в WhatsApp или Telegram напрямую.';
        msgDiv.style.color = 'red';
      }
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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
// Активация эффекта параллакса для фото
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});
document.addEventListener("DOMContentLoaded", () => {
    const contactButtons = document.querySelectorAll('.contact-buttons .btn');
    
    contactButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#C5A059', '#ffffff', '#222529'] // Бронза, белый и цвет сайта
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const contactButtons = document.querySelectorAll('.contact-buttons .btn');
    
    contactButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Салют запускается мгновенно
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#C5A059', '#ffffff', '#25282b'] // Бронза, белый, асфальт
            });
            
            // Больше ничего не блокируем. 
            // Браузер сам откроет ссылку мгновенно, 
            // а салют будет лететь поверх уже открывающегося окна/вкладки.
        });
    });
});

// Музыкальный проигрыватель - предельно простой код
const music = new Audio('music.mp3'); // Создаем объект звука напрямую
music.loop = true;
const btn = document.getElementById('music-btn');

btn.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            btn.classList.add('playing');
        }).catch(err => {
            console.error("Браузер заблокировал автоплей:", err);
        });
    } else {
        music.pause();
        btn.classList.remove('playing');
    }
});
