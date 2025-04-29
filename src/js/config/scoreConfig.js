import { stats, salvarStats } from "@js/config/playerStats";

export let score = 0;

export function carregarScore() {
    const salvo = localStorage.getItem('score');
    score = salvo? parseInt(salvo,10):0;
}

export function atualizarPontos(pontos) {
    score += pontos;
    localStorage.setItem('score',score);
    stats.totalPontos += pontos;
    salvarStats(stats)
}