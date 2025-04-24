import { FastAverageColor } from 'fast-average-color';
import { albumAtual, tentativas, marcarAdivinhado, resetarTentativas, adivinhado } from './config/gameConfig.js';
import TomSelect from 'tom-select';

const fac = new FastAverageColor();

export async function exibirCapa(album) {
  const capa = document.getElementById('capa');
  capa.src = album.images[0].url;

  fac.getColorAsync(album.images[0].url).then(cor => {
    document.body.style.backgroundColor = cor.rgba;
  })
}

export function preencherSelect(albuns) {
  const select = document.getElementById('album-select');
  select.innerHTML = '';
  select.tomselect?.destroy();

  select.appendChild(new Option('Selecione um álbum...','',true,true));

  albuns.forEach(album => {
    const opt = new Option(album.name, album.name);
    select.appendChild(opt);
  });

  new TomSelect(select, {
    maxItems: 1,
    closeAfterSelect: true,
    hideSelected: true,
    onChange: value => value && verificarPalpite(value, albumAtual.name),
  });
}

export function verificarPalpite(tentativaUsuario, resposta) {
  if (tentativas < 1 || adivinhado) return;

  const imagem = document.getElementById('capa');
  const vidas = document.getElementById('vidas');
  const tentativasLista = document.getElementById('tentativas');
  const audio = document.getElementById('audio-acerto');
  const select = document.getElementById('album-select').tomselect;

  const li = document.createElement('li');
  li.classList.add('list-group-item');

  if (tentativaUsuario === resposta) {
    marcarAdivinhado();
    li.classList.add('list-group-item-success');
    li.textContent = `✔️ ${tentativaUsuario}`;

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      shapes: ['star'],
    });

    audio.currentTime = 0;
    audio.play();

    imagem.style.transform = 'scale(1)';
    document.getElementById('proximo-album').style.display = '';
    select.disable();

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
  console.log(tentativas)
  if (tentativas === 0 && !adivinhado) {
    mostrarResposta(resposta);
    document.getElementById('proximo-album').style.display = '';
  }
}

export function atualizarVidas() {
  const vidas = document.getElementById('vidas');
  vidas.innerHTML = '';

  for (let i = 0; i < tentativas; i++) {
    const li = document.createElement('li');
    li.innerHTML = '<span>❤</span>';
    vidas.appendChild(li);
  }
}

export function mostrarResposta(nomeAlbum) {
  const resposta = document.getElementById('resposta');
  resposta.textContent = nomeAlbum;
  resposta.classList.remove('d-none');
}