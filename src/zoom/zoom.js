import '../css/styles.css'
import { modoZoom } from '../js/gamemode/zoomGame.js';
import { registrarJogo } from '../js/config/playerStats.js';
import { getArtistInfo } from '../js/spotify/spotify.js';

let artistaAtual = new URLSearchParams(window.location.search).get('artist');

document.querySelector('#app').innerHTML = `
<div id="carregando" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
  <div class="spinner-border" id="spinner" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>

<div id="conteudo" style="display: none;" class="page d-flex flex-column min-vh-100">
  <main class="container px-3 flex-grow-1 py-2">
    <div class="left-side w-100">
      <div class="card p-3">
        <div class="img-wrapper" id="img-wrapper">
          <img id="capa" alt="Capa do álbum">
          <div id="resposta" class="resposta-overlay d-none">Resposta</div>
        </div>
        <div class="mt-2 d-flex align-items-center">
          <span>Tentativas Restantes: </span>
          <ul id="vidas" class="d-flex px-2 m-0"></ul>
        </div>
        <button type="button" class="btn btn-success mt-2" style="display: none" id="proximo-album">
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>

    <div class="right-side w-100">
      <div class="card p-3">
        <span>Nome do Álbum:</span>
        <select id="album-select" class="tom-select" placeholder="🔎 Selecione um álbum...">
        </select>
      </div> 
      <div class="card p-3 mt-2">
        Seus chutes: 
        <ul id="tentativas" class="list-group"></ul>
      </div>
    </div>
  </main>
  <footer class="d-flex flex-column align-items-center p-3">
    <div class="d-flex align-items-center flex-column">
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