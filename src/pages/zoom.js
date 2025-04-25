import '@styles/global.css';
import { modoZoom } from '@js/gamemode/zoomGame.js';
import { registrarJogo } from '@js/config/playerStats.js';
import { getArtistInfo } from '@js/spotify/spotify.js';

let artistaAtual = new URLSearchParams(window.location.search).get('artist');

document.querySelector('#app').innerHTML = `
<div id="carregando" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
  <div class="spinner-border" id="spinner" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>

<div class="page d-flex flex-column min-vh-100" id="conteudo">
  <main class="container px-3 flex-grow-1">
    <div class="row">
      <!-- Coluna da esquerda com a imagem e interações -->
      <div class="col-md-6 mb-4">
        <div class="card p-4 d-flex flex-column justify-content-between h-100">
          <div class="img-wrapper mb-3" id="img-wrapper">
            <img id="capa" alt="Capa do álbum">
            <div id="resposta" class="resposta-overlay d-none">Resposta</div>
          </div>
          <div>
            <div class="d-flex align-items-center">
              <span>Tentativas Restantes:</span>
              <ul id="vidas" class="d-flex px-2 m-0"></ul>
            </div>
            <button type="button" class="btn btn-success mt-3 w-100" style="display: none" id="proximo-album">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Coluna da direita com os seletores e tentativas -->
      <div class="col-md-6">
        <div class="card p-4 mb-3">
          <span>Nome do Álbum:</span>
          <select id="album-select" class="tom-select" placeholder="🔎 Selecione um álbum..."></select>
        </div>
        <div class="card p-4 chutes">
          Seus chutes:
          <ul id="tentativas" class="list-group mt-2"></ul>
        </div>
      </div>
    </div>
  </main>

  <footer class="d-flex flex-column align-items-center p-3 mt-auto">
    <div class="d-flex align-items-center flex-column text-center">
      <span>Desenvolvido por not2nder. Dados pela <a target="_blank" href="https://developer.spotify.com/documentation/web-api">API do Spotify</a></span>
      <span>© 2025 NOT2NDER</span>
    </div>
  </footer>
</div>
`;

getArtistInfo(artistaAtual).then(data => {
  modoZoom(artistaAtual);
  registrarJogo(data.name);
})