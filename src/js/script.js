import Colorthief from 'colorthief';
import { albumAtual, tentativas, marcarAdivinhado, resetarTentativas, adivinhado, getVidas, diminuirVidas} from '@js/config/gameConfig.js';
import { registrarAcerto, registrarErro, registrarPontos } from '@js/config/playerStats.js';
import imgUrl from '@assets/img/heart.png'
import TomSelect from 'tom-select';

export async function exibirCapa(album) {
  const capa = document.getElementById('capa');
  capa.crossOrigin = 'anonymous';
  capa.src = album.images[0].url;

  capa.onload = async () => {
    const colorthief = new Colorthief();
    const cor = await colorthief.getPalette(capa)[3];
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
  if (adivinhado || getVidas <=0) return;

  const imagem = document.getElementById('capa');
  const ulVidas = document.getElementById('vidas');
  const tentativasLista = document.getElementById('tentativas');
  const audio = document.getElementById('audio-acerto');
  const select = document.getElementById('album-select').tomselect;

  const li = document.createElement('li');
  li.classList.add('list-group-item');

  const artista = albumAtual.artists[0].name;

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

    //registrar pontos
    registrarPontos(artista, tentativas*5);
    registrarAcerto(artista);

  } else {
    resetarTentativas();
    diminuirVidas();

    li.classList.add('list-group-item-danger');
    li.textContent = `❌ ${tentativaUsuario}`;

    if (tentativas >= 1) imagem.style.transform = `scale(${tentativas})`;

    ulVidas.classList.add('shake');
    setTimeout(() => ulVidas.classList.remove('shake'), 400);
    atualizarVidas(albumAtual.artists[0].name);
  }

  tentativasLista.appendChild(li);
  if (getVidas() === 0 && !adivinhado) {
    mostrarResposta(resposta);
    registrarErro(artista);
  }

  console.log(getVidas());
}

export function atualizarVidas() {
  const ulVidas = document.getElementById('vidas');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < getVidas(); i++) {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${imgUrl}" class="heart">`;
    fragment.appendChild(li);
  }

  ulVidas.innerHTML = '';
  ulVidas.appendChild(fragment);
}

export function mostrarResposta(nomeAlbum) {
  const resposta = document.getElementById('resposta');
  const imgCapa = document.getElementById('capa');
  const select = document.getElementById('album-select').tomselect;

  select.disable();
  imgCapa.style.transform = 'scale(1)';
  resposta.textContent = nomeAlbum;
  resposta.classList.remove('d-none');
}