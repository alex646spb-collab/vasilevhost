document.addEventListener("DOMContentLoaded", () => {

  // 1. Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // 2. Cookie banner
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBtn = document.getElementById('cookie-btn');
  if (cookieBanner && cookieBtn) {
    if (!localStorage.getItem('cookieAccepted')) {
      cookieBanner.style.display = 'flex';
    }
    cookieBtn.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // 3. Модалка политики
  const modal = document.getElementById("policyModal");
  const openBtn = document.getElementById("openPolicy");
  const closeBtn = document.getElementById("closePolicy");
  if (openBtn) openBtn.onclick = (e) => { e.preventDefault(); modal.style.display = "block"; };
  if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  // 4. Философия (Волна)
  const philosophyLists = document.querySelectorAll('#philosophy ul');
  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('li').forEach((li, index) => {
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

  // 5. Отзывы (Модалка)
  const reviewCards = document.querySelectorAll('.review-card');
  if (reviewCards.length > 0) {
    const overlay = document.createElement('div');
    overlay.className = 'review-overlay';
    document.body.appendChild(overlay);
    reviewCards.forEach(card => {
      const closeBtn = document.createElement('div');
      closeBtn.className = 'review-close-btn'; closeBtn.innerHTML = '×';
      card.appendChild(closeBtn);
      card.addEventListener('click', function(e) {
        if (e.target.classList.contains('review-close-btn')) return;
        reviewCards.forEach(c => c.classList.remove('is-expanded'));
        this.classList.add('is-expanded');
        document.body.classList.add('modal-open');
      });
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); card.classList.remove('is-expanded');
        document.body.classList.remove('modal-open');
      });
    });
    overlay.addEventListener('click', () => {
      reviewCards.forEach(c => c.classList.remove('is-expanded'));
      document.body.classList.remove('modal-open');
    });
  }

  // 6. Галерея
  const galleryTarget = document.querySelector('.photo-mosaic');
  if (galleryTarget) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => galleryTarget.classList.add('is-visible'), 500);
      }
    }, { threshold: 0.5 }).observe(galleryTarget);
  }

  // 7. Таймлайн
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('show'), index * 200);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  timelineSteps.forEach(step => tlObserver.observe(step));

  // 8. Заголовок (Буквы)
  const title = document.querySelector(".hero-title");
  const letters = document.querySelectorAll(".hero-title .letter");
  if (title && letters.length > 0) {
    letters.forEach((l, i) => l.style.animation = `flyIn 0.6s forwards ${i * 0.05}s`);
    setTimeout(() => title.style.filter = "blur(0)", letters.length * 50 + 600);
  }

  // 9. FAQ (Аккордеон)
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      document.querySelectorAll(".faq-answer").forEach(i => { if(i !== answer) i.style.maxHeight = null; });
      answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
    // Вставьте сюда ваши данные:
    const BOT_TOKEN = "8363528727:AAHehZCVe4GQKQFYP68K8rC5NfnyCK-H4Y8";
    const CHAT_ID = "1389330369";

    const form = document.getElementById('tg-form');
    const msgDiv = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msgDiv.textContent = 'Отправка...';
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const text = `📩 НОВАЯ ЗАЯВКА\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n👥 Гостей: ${data.guests || '-'}\n📍 Место: ${data.location || '-'}\n🔎 Откуда: ${data.source || '-'}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: text })
            });

            if (response.ok) {
                msgDiv.textContent = 'Спасибо! Заявка отправлена.';
                msgDiv.style.color = '#C5A059';
                form.reset();
            } else {
                throw new Error('Ошибка сети');
            }
        } catch (err) {
            msgDiv.textContent = 'Ошибка отправки. Попробуйте снова.';
            msgDiv.style.color = 'red';
        }
    });
});
