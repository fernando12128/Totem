// Lista dos caminhos das imagens que você quer alternar
const imagens = [
    'images/IMGS_PARA_BANNER/Imagem vet.png',
    'images/IMGS_PARA_BANNER/BANNER_02_IN.png', // Substitua pelo caminho da sua segunda imagem
    'images/IMGS_PARA_BANNER/BANNER_03_ES.png',  // Substitua pelo caminho da sua terceira imagem
];

let imagemAtualIndex = 0;
const bannerElement = document.getElementById('bannerInicial');

function mudarImagem() {
    // Incrementa o índice. Se chegar ao fim do array, volta para o início.
    imagemAtualIndex = (imagemAtualIndex + 1) % imagens.length;
    
    // Altera o atributo 'src' do elemento da imagem
    bannerElement.src = imagens[imagemAtualIndex];
}

// Inicia o slideshow quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    // Define a primeira imagem
    bannerElement.src = imagens[0];
    
    // Altera a imagem a cada 3000 milissegundos (3 segundos)
    setInterval(mudarImagem, 3000);
});