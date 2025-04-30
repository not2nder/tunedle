import { albumAtual, tentativas, marcarAdivinhado, resetarTentativas, adivinhado, getVidas, diminuirVidas} from '@js/config/gameConfig.js';
import { registrarAcerto, registrarErro, registrarPontos } from '@js/config/playerStats.js';

import TomSelect from 'tom-select';
import Colorthief from 'colorthief';

import imgUrl from '@assets/img/heart.png'

export async function exibirCapa(album) {
  const capa = document.getElementById('capa');
  capa.crossOrigin = 'anonymous';
  capa.src = album.images[0].url;

  capa.onload = () => {
    const colorthief = new Colorthief();
    const cor = colorthief.getPalette(capa)[3];
    if (!cor) return;

    const [r,g,b] = cor;
    const corLight = `rgb(${Math.min(r+30,200)},${Math.min(g+30,200)},${Math.min(b+30,200)})`
    const corBase = `rgb(${cor.join(',')})`;

    document.body.style.background = `linear-gradient(0deg, ${corBase},${corLight})`;
  }
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
  if (adivinhado || getVidas() <=0) return;

  const imagem = document.getElementById('capa');
  const tentativasLista = document.getElementById('tentativas');
  const audio = document.getElementById('audio-acerto');
  const select = document.getElementById('album-select').tomselect;
  const btnProximo = document.getElementById('proximo-album');

  const li = document.createElement('li');
  li.classList.add('list-group-item');

  const artista = albumAtual.artists[0].name;

  if (tentativaUsuario === resposta) {
    if (adivinhado) return;

    marcarAdivinhado();
    li.classList.add('list-group-item-success');
    li.textContent = `✔️ ${tentativaUsuario}`;

    document.getElementById('pular-album').disabled = true;

    confetti({
      particleCount: 80,
      spread: 360,
      origin: { y: 0.2 },
    });

    audio.currentTime = 0;
    audio.play();

    imagem.style.transform = 'scale(1)';
    btnProximo.disabled = false;
    select.disable();

    //registrar pontos
    registrarPontos(artista, tentativas*5);
    registrarAcerto(artista);

  } else {
    resetarTentativas();
    diminuirVidas();

    li.classList.add('list-group-item-danger');
    li.textContent = `❌ ${tentativaUsuario}`;

    if (tentativas >= 1) imagem.style.transform = `scale(${tentativas})`;

    atualizarVidas();

    if (getVidas() === 0 && !adivinhado) {
      mostrarResposta(resposta);
      registrarErro(artista);
      btnProximo.disabled = true;
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

  resposta.textContent = nomeAlbum;
  imgCapa.style.transform = 'scale(1)';
  resposta.classList.remove('d-none');
  
  select.disable();
}