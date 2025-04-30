import { albumAtual, tentativas, marcarAdivinhado, resetarTentativas, adivinhado, getVidas, diminuirVidas} from '@js/config/gameConfig.js';
import { registrarAcerto, registrarErro, registrarPontos } from '@js/config/playerStats.js';

import TomSelect from 'tom-select';
import Colorthief from 'colorthief';

import imgUrl from '@assets/img/heart.png'

export async function exibirCapa(album) {
  const capa = document.getElementById('capa');
  capa.src = album.images[0].url;

  capa.onload = () => {
    const colorthief = new Colorthief();
    const cor = colorthief.getPalette(capa)[3];
    if (!cor) return;

    const corBase = `rgb(${cor.join(',')})`;
    const corLight = `rgb(${cor.map(c => Math.min(c + 30, 200)).join(',')})`;

    document.body.style.background = `linear-gradient(0deg, ${corBase},${corLight})`;
  }
}

export function preencherSelect(albuns) {
  const select = document.getElementById('album-select');
  select.innerHTML = '';
  select.tomselect?.destroy();

  select.appendChild(new Option('Selecione um álbum...','',true,true));

  albuns.forEach(({ name }) => {
    select.appendChild(new Option(name, name));
  });

  new TomSelect(select, {
    maxItems: 1,
    closeAfterSelect: true,
    hideSelected: true,
    onChange: value => value && verificarPalpite(value, albumAtual.name),
  });
}

export function verificarPalpite(tentativaUsuario, resposta) {
  if (adivinhado || getVidas() <=0) return;

  const imagem = document.getElementById('capa');
  const tentativasLista = document.getElementById('tentativas');
  const btnProximo = document.getElementById('proximo-album');
  const artista = albumAtual.artists[0].name;

  const li = document.createElement('li');
  li.classList.add('list-group-item');

  if (tentativaUsuario === resposta) {
    if (adivinhado) return;

    marcarAdivinhado();
    li.classList.add('list-group-item-success');
    li.textContent = `✔️ ${tentativaUsuario}`;

    document.getElementById('pular-album').disabled = true;
    
    registrarPontos(artista, tentativas*5);
    registrarAcerto(artista);
    
    mostrarResposta(resposta);
  } else {
    resetarTentativas();
    diminuirVidas();

    li.classList.add('list-group-item-danger');
    li.textContent = `❌ ${tentativaUsuario}`;

    if (tentativas >= 1) imagem.style.transform = `scale(${tentativas})`;

    atualizarVidas();

    if (getVidas() === 0 && !adivinhado) {
      registrarErro(artista);
      btnProximo.disabled = true;
      mostrarResposta(resposta);
    }
  }
  tentativasLista.appendChild(li);
}

export function atualizarVidas() {
  const ulVidas = document.getElementById('vidas');
  ulVidas.replaceChildren(...Array.from({length: getVidas()}, () => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${imgUrl}" class="heart">`;
    return li;
  }));  
}

export function mostrarResposta(nomeAlbum) {

  const resposta = document.getElementById('resposta');
  const imgCapa = document.getElementById('capa');
  const select = document.getElementById('album-select').tomselect;
  const btnProximo = document.getElementById('proximo-album');
  const audio = document.getElementById('audio-acerto');

  resposta.textContent = nomeAlbum;
  imgCapa.style.transform = 'scale(1)';
  resposta.classList.remove('d-none');

  if (adivinhado) {
    audio.currentTime = 0;
    audio.play();
    confetti({
      particleCount: 80,
      spread: 360,
      origin: { y: 0.2 },
    });
    btnProximo.disabled = false;
  }
  select.disable();
}