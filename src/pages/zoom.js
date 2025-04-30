import '@styles/global.css';
import { modoZoom } from '@js/gamemode/zoomGame.js';
import { registrarJogo } from '@js/config/playerStats.js';
import { getArtistInfo } from '@js/spotify/spotify.js';

let artistaAtual = new URLSearchParams(window.location.search).get('artist');

document.querySelector('#app').innerHTML = /*html*/`
<!-- Spinner -->
<div id="carregando" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
  <div class="spinner-border" id="spinner" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>

<!-- Conteudo -->
<div class="page d-flex flex-column min-vh-100" id="conteudo">
  <main class="page-container px-3 flex-grow-1 min-vh-100 align-items-center">
    <div class="row">
      <!-- Esquerda/cima -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 d-flex flex-column justify-content-between">
          <div class="img-wrapper" id="img-wrapper">
            <img id="capa" alt="Capa do álbum" crossorigin="anonymous">
            <div id="resposta" class="resposta-overlay d-none">Resposta</div>
          </div>
          <div class="mt-2 d-flex align-items-center">
            <span>Tentativas Restantes: </span>
            <ul id="vidas" class="d-flex px-2 m-0"></ul>
          </div>
          <button type="button" class="button hard mt-2 w-100" id="pular-album">
            <span>Pular</span>
          </button>
          <button type="button" class="button easy mt-2 w-100" id="proximo-album">
            <span>próximo</span>
          </button>
        </div>
      </div>

      <!-- Direita/baixo -->
      <div class="col-md-6 mb-4">
        <div class="card p-3">
          <span>Nome do Álbum:</span>
          <select id="album-select" class="tom-select" placeholder="🔎 Selecione um álbum...">
          </select>
        </div> 
        <div class="card p-3 mt-2 chutes mb-0">
          Seus chutes: 
          <ul id="tentativas" class="list-group"></ul>
        </div>
      </div>
    </div>
  </main>
</div>
`;

getArtistInfo(artistaAtual).then(data => {
  modoZoom(artistaAtual);
  registrarJogo(data.name);
});