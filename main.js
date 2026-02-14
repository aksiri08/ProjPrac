// ===== Floating Hearts Background =====
function createFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const hearts = ['❤', '♥', '💕', '💗'];

  setInterval(() => {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 16000);
  }, 800);
}

// ===== Envelope Interaction =====
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const hint = document.getElementById('envelopeHint');

  envelope.addEventListener('click', () => {
    envelope.classList.toggle('opened');
    if (envelope.classList.contains('opened')) {
      hint.textContent = 'Click to close';
    } else {
      hint.textContent = 'Click the envelope to open';
    }
  });
}

// ===== Scroll Reveal Animations =====
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }, observerOptions);

  // Observe reason cards
  document.querySelectorAll('.reason-card').forEach(card => {
    observer.observe(card);
  });

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
}

// ===== Surprise Button =====
function initSurprise() {
  const btn = document.getElementById('surpriseBtn');
  const overlay = document.getElementById('surpriseOverlay');
  const closeBtn = document.getElementById('closeSurprise');
  const fireworkContainer = document.getElementById('fireworkHearts');

  btn.addEventListener('click', () => {
    overlay.classList.add('active');
    createFireworkHearts(fireworkContainer);
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    fireworkContainer.innerHTML = '';
    document.body.style.overflow = '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      fireworkContainer.innerHTML = '';
      document.body.style.overflow = '';
    }
  });
}

function createFireworkHearts(container) {
  const hearts = ['❤', '♥', '💕', '💗', '💖', '💘', '💝'];
  const colors = ['#ff4564', '#ff8fa3', '#ffb3c1', '#ff6b81', '#ff1744'];

  function burst() {
    const cx = Math.random() * window.innerWidth;
    const cy = Math.random() * window.innerHeight;

    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('span');
      heart.classList.add('firework-heart');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = cx + 'px';
      heart.style.top = cy + 'px';
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];

      const angle = (Math.PI * 2 * i) / 12;
      const distance = 80 + Math.random() * 120;
      heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

      container.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  }

  // Initial bursts
  for (let i = 0; i < 5; i++) {
    setTimeout(burst, i * 300);
  }

  // Continuous bursts
  const interval = setInterval(burst, 600);

  // Stop after overlay closes
  const check = setInterval(() => {
    if (!container.closest('.active')) {
      clearInterval(interval);
      clearInterval(check);
    }
  }, 500);
}

// ===== Big Heart Click Effect =====
function initBigHeart() {
  const heart = document.getElementById('bigHeart');
  heart.addEventListener('click', () => {
    heart.style.transition = 'transform 0.3s ease';
    heart.style.transform = 'scale(1.5)';
    setTimeout(() => {
      heart.style.transform = 'scale(1)';
    }, 300);

    // Spawn mini hearts around it
    for (let i = 0; i < 8; i++) {
      const mini = document.createElement('span');
      mini.textContent = '❤';
      mini.style.position = 'fixed';
      mini.style.fontSize = '1.5rem';
      mini.style.color = '#ff4564';
      mini.style.pointerEvents = 'none';
      mini.style.zIndex = '100';

      const rect = heart.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mini.style.left = cx + 'px';
      mini.style.top = cy + 'px';

      const angle = (Math.PI * 2 * i) / 8;
      const dist = 60 + Math.random() * 40;
      mini.style.transition = 'all 0.8s ease-out';

      document.body.appendChild(mini);

      requestAnimationFrame(() => {
        mini.style.left = (cx + Math.cos(angle) * dist) + 'px';
        mini.style.top = (cy + Math.sin(angle) * dist) + 'px';
        mini.style.opacity = '0';
        mini.style.transform = 'scale(0.3)';
      });

      setTimeout(() => mini.remove(), 900);
    }
  });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  initEnvelope();
  initScrollReveal();
  initSurprise();
  initBigHeart();
});
