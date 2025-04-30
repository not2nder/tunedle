export let adivinhado = false;
export let albunsAtual = null;
export let albumAtual = null;
export let tentativas = 4;
export let vidas = 5;
export let pulos = 3;

//score: pontuaçao e estatisticas do jogo
export let score = {
    maxAcertos: 0,
    maxPontos: 0,
    acertos: 0,
    pontos: 0,
    flawless: false,
}

export function inicioJogo() {
    tentativas = 4;
    adivinhado = false;
}

export function resetarTentativas() {
    if (!adivinhado) {
        tentativas--;
    } else {
        tentativas = 4;
        adivinhado = false;
    }
}

export function marcarAdivinhado() {
    adivinhado = true;
    score.acertos++;
    score.pontos+= getVidas();
}

export function definirPontos(lista) {
    score.maxPontos = lista.length * 5;
    score.maxAcertos = lista.length;
}

export function setAlbuns(lista) {
    albunsAtual = lista;
}

export function setAlbum(album) {
    albumAtual = album;
}

export function getVidas() {
    return vidas;
}

export function diminuirVidas() {
    vidas--;
    
    const ulVidas = document.getElementById('vidas');
    ulVidas.classList.add('shake');
    setTimeout(() => ulVidas.classList.remove('shake'), 400);
}

export function diminuirPulos() {
    pulos--;
}