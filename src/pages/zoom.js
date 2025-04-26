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

<div id="conteudo" style="display: none;" class="page d-flex flex-column min-vh-100">
  <main class="page-container flex-grow-1">
    <div class="left-side">
      <div class="card p-3">
        <div class="img-wrapper" id="img-wrapper">
          <img id="capa" alt="Capa do álbum">
          <div id="resposta" class="resposta-overlay d-none">Resposta</div>
        </div>
        <div class="mt-2 d-flex align-items-center">
          <span>Tentativas Restantes: </span>
          <ul id="vidas" class="d-flex px-2 m-0"></ul>
        </div>
        <button type="button" class="button-30 easy mt-2" style="display: none" id="proximo-album">
          <span>próximo</span>
        </button>
      </div>
    </div>

    <div class="right-side">
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
  </main>
  <footer class="footer mt-auto py-3">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div>
        <span>© 2025 NOT2NDER</span>
      </div>
      <div>
        <a href="https://developer.spotify.com/documentation/web-api" target="_blank">API do Spotify</a>
      </div>
      <div class="social-icons mt-2 mt-md-0">
        <a href="https://github.com/not2nder"><i class="bi bi-github"></i></a>
        <a href="https://instagram.com/2nder.dev"><i class="bi bi-instagram"></i></a>
        <a href="https://tiktok.com/@not2nder"><i class="bi bi-tiktok"></i></a>
      </div>
    </div>
  </footer>
</div>
`;

getArtistInfo(artistaAtual).then(data => {
  modoZoom(artistaAtual);
  registrarJogo(data.name);
});

