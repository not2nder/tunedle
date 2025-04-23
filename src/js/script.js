import { FastAverageColor } from 'fast-average-color';
import { albumAtual, tentativas, marcarAdivinhado, resetarTentativas } from './config/gameConfig.js';
import TomSelect from 'tom-select';

export async function exibirCapa(album) {
  const fac = new FastAverageColor();
  const capa = document.getElementById('capa');
  capa.src = album.images[0].url;

  fac.getColorAsync(album.images[0].url).then(cor => {
    document.body.style.backgroundColor = cor.rgba;
  });
}

export function preencherSelect(albuns) {
  const select = document.getElementById('album-select');
  select.innerHTML = '';
  select.tomselect?.destroy();

  for (const album of albuns) {
    const opt = document.createElement('option');
    opt.value = album.name;
    opt.textContent = album.name;
    select.appendChild(opt);
  }

  new TomSelect('#album-select', {
    maxItems: 1,
    closeAfterSelect: true,
    sortField: { field: 'text', direction: 'asc' },
    onChange: value => {
      if (value) verificarPalpite(value, albumAtual.name);
    }
  });
}

export function verificarPalpite(tentativaUsuario, resposta) {
  if (tentativas < 1) return;

  const imagem = document.getElementById('capa');
  const vidas = document.getElementById('vidas');
  const tentativasLista = document.getElementById('tentativas');
  const li = document.createElement('li');
  li.classList.add('list-group-item');

  if (tentativaUsuario === resposta) {
    marcarAdivinhado();
    li.classList.add('list-group-item-success');
    li.textContent = `✔️ ${tentativaUsuario}`;
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    imagem.style.transform = 'scale(1)';
    document.getElementById('proximo-album').style.display = '';
  } else {
    resetarTentativas();
    li.classList.add('list-group-item-danger');
    li.textContent = `❌ ${tentativaUsuario}`;
    if (tentativas >= 1) imagem.style.transform = `scale(${tentativas})`;
    vidas.classList.add('shake');
    setTimeout(() => vidas.classList.remove('shake'), 400);
    atualizarVidas();
  }
  tentativasLista.appendChild(li);
  if (tentativas === 0) {
    mostrarResposta(resposta);
    document.getElementById('proximo-album').style.display = '';
  }  
}

export function atualizarVidas() {
  const vidas = document.getElementById('vidas');
  vidas.innerHTML = '';
  for (let i = 0; i < tentativas; i++) {
    const li = document.createElement('li');
    li.innerHTML = '<img class="list-inline-item" src="src/assets/heart.png">';
    vidas.appendChild(li);
  }
}

export function mostrarResposta(nomeAlbum) {
  const resposta = document.getElementById('resposta');
  resposta.textContent = `${nomeAlbum}`;
  resposta.classList.remove('d-none');
}