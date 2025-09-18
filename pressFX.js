/** Ativa “hover para touch” + teclado em qualquer seletor. */
function attachPressFX(selector, { delay=280 } = {}) {
  document.querySelectorAll(selector).forEach(el => {
    // garante a classe base
    el.classList.add('pressable');

    // acha link de navegação (o próprio elemento ou um <a> interno)
    const link = el.tagName === 'A' ? el : el.querySelector('a');

    el.addEventListener('touchstart', (e) => {
      // evita tap fantasma e dá tempo do efeito aparecer
      e.preventDefault();
      el.classList.add('is-touch-active');
    }, { passive:false });

    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      el.classList.remove('is-touch-active');
      if (link && link.href) {
        setTimeout(() => { window.location.href = link.href; }, delay);
      }
    }, { passive:false });

    el.addEventListener('touchcancel', () => {
      el.classList.remove('is-touch-active');
    });

    // teclado (Enter / Espaço)
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (link && link.href) window.location.href = link.href;
      }
    });
  });
}
