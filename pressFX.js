/** Ativa “hover para touch” + teclado sem bloquear o scroll. */
function attachPressFX(selector, { delay = 180, moveTolerance = 12 } = {}) {
  const withinTol = (a, b) => Math.abs(a - b) <= moveTolerance;

  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('pressable');

    // Se não for link, torna focável para teclado
    if (el.tabIndex < 0) el.tabIndex = 0;

    // Libera gesto nativo (tap/scroll) no elemento
    if (!el.style.touchAction) el.style.touchAction = 'manipulation'; // ou 'pan-y'

    const link = el.tagName === 'A' ? el : el.querySelector('a');

    let downX = 0, downY = 0, pressed = false, moved = false, upTimer = null;

    const onDown = (ev) => {
      pressed = true; moved = false;
      downX = ev.clientX; downY = ev.clientY;
      el.classList.add('is-touch-active');
    };

    const onMove = (ev) => {
      if (!pressed) return;
      if (!withinTol(ev.clientX, downX) || !withinTol(ev.clientY, downY)) {
        moved = true;
        el.classList.remove('is-touch-active');
      }
    };

    const activate = () => {
      if (!link) return;
      // Se o próprio elemento já for <a>, deixa o navegador fazer a navegação.
      if (el === link) return;
      // Em card (DIV) com <a> dentro: dispara o click do link.
      link.click();
    };

    const onUp = () => {
      if (!pressed) return;
      el.classList.remove('is-touch-active');
      if (!moved) {
        if (delay > 0) {
          clearTimeout(upTimer);
          upTimer = setTimeout(activate, delay);
        } else {
          activate();
        }
      }
      pressed = false; moved = false;
    };

    const onCancel = () => {
      if (!pressed) return;
      el.classList.remove('is-touch-active');
      pressed = false; moved = false;
    };

    // Pointer Events (cobrem touch/mouse/caneta) e não bloqueiam o scroll
    el.addEventListener('pointerdown', onDown, { passive: true });
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerup',   onUp,   { passive: true });
    el.addEventListener('pointercancel', onCancel, { passive: true });
    el.addEventListener('lostpointercapture', onCancel, { passive: true });

    // Teclado (Enter/Espaço) — não precisa preventDefault
    el.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && link) link.click();
    });
  });
}
