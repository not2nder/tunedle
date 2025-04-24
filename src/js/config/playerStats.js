const STORAGE_KEY = 'gameStats';

export let stats = {
    totalPontos: 0,
    totalJogos: 0,
    acertos: 0,
    erros: 0,
    artistas: {}
};

export function salvarStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function carregarStats() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    stats = salvo ? JSON.parse(salvo) : {
        totalPontos: 0,
        totalJogos: 0,
        acertos: 0,
        erros: 0,
        artistas: {}
    };
}

//para registrar cada jogo (seçao)
export function registrarJogo(artista) {
    carregarStats();
    if (!stats.artistas[artista]) {
        stats.artistas[artista] = {
            jogos: 0,
            acertos: 0,
            pontos: 0,
            erros: 0,
        }
    }

    stats.artistas[artista].jogos++;
    stats.totalJogos++;

    salvarStats();
}

//registrar acerto (global)
export function registrarAcerto(nomeArtista) {
    carregarStats();
    stats.acertos++;
    stats.artistas[nomeArtista].acertos++;
    salvarStats();
}

//registrar erro (global)
export function registrarErro(nomeArtista) {
    carregarStats();
    stats.erros++;
    stats.artistas[nomeArtista].erros++;
    salvarStats();
}

export function atualizarJogos() {
    carregarStats();
    stats.totalJogos++;
    salvarStats();
}

export function registrarPontos(nomeArtista, pontos) {
    carregarStats();
    stats.totalPontos += pontos;
    stats.artistas[nomeArtista].pontos += pontos;
    salvarStats();
}