export let albunsAtual = null;
export let albumAtual = null;
export let adivinhado = false;
export let tentativas = 4; // tentativas = zoom
export let vidas = 5; // vidas = vidas

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
}