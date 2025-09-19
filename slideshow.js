// slideshow.js
(function () {
  const imagens = [
    'images/IMGS_PARA_BANNER/Imagem vet.png',
    'images/IMGS_PARA_BANNER/BANNER_02_IN.png',
    'images/IMGS_PARA_BANNER/BANNER_03_ES.png',
  ];

  function start() {
    const img = document.getElementById('bannerInicial');
    if (!img) {
      console.warn('[slideshow] #bannerInicial não encontrado');
      return;
    }

    let i = 0;
    const troca = () => {
  img.classList.add('is-fading');
  setTimeout(() => {
    i = (i + 1) % imagens.length;
    img.onload = () => img.classList.remove('is-fading');
    img.src = imagens[i];
  }, 150);
};

    // primeira imagem + log de erros de caminho
    img.onerror = () => console.error('[slideshow] erro ao carregar:', img.src);
    img.src = imagens[0];

    // troca a cada 3s
    setInterval(troca, 3000);
  }

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();
