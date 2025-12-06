import { getSpotifyAccessToken } from '@js/spotify/spotify.js';
import { frases } from '@js/frases';
import '@styles/global.css';

import TomSelect from 'tom-select';

document.querySelector('#app').innerHTML = /*html*/`
<header class="w-100 py-4 px-5 d-flex align-items-center justify-content-between">
  <h2>🎵 Tunedle</h2>
</header>

<section id="homeContainer" class="page-container d-flex flex-column min-vh-100 px-3 flex-grow-1">
  <div class="my-4">
      <h1 class="pulse main-text mb-4 text-center" id="text-pulse"></h1>
  </div>

  <div class="row justify-content-center">

    <!-- MODO DE JOGO -->
    <div class="col-md-6 mb-4">
      <div class="card card-hover p-4 h-100">

        <h4 class="mb-3">
          <i class="fa-solid fa-gamepad"></i> Modos de Jogo
        </h4>

        <p class="mb-2">Escolha um artista para começar:</p>

        <select id="artist-select" class="tom-select"
                placeholder="🔎 Procure um Artista"></select>

        <button class="btn w-100 button easy mt-4" id="modo-zoom">
          <strong>MODO ZOOM 🔎</strong>
          <span class="small d-block">Descubra o álbum pela capa</span>
        </button>

      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="card card-hover p-4 d-flex flex-column justify-content-between">
        <div>
          <h3><i class="fa-solid fa-music"></i> Tunedle</h3>
          <p>
            Tente adivinhar o nome de um álbum apenas olhando a capa — quanto mais rápido, melhor!
            No <strong>Modo Zoom</strong>, a imagem é revelada aos poucos... consegue acertar antes de ver tudo?
          </p>
          <p> Mais modos em breve!</p>
          <p class="text-muted small">Versão 1.0 • Desenvolvido por <strong>not2nder</strong>.</p>
        </div>
        <span>Apoie o Desenvolvedor:</span>
        <div>
          <a href="https://github.com/not2nder" target="_blank"><i class="fa-brands fa-github"></i></a>
          <a href="https://instagram.com/not2nder" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const select = document.getElementById('artist-select');

document.getElementById('text-pulse').textContent = frases[Math.floor(Math.random() * frases.length)];

new TomSelect(select, {
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    maxOptions: 10,
    maxItems: 1,
    closeAfterSelect: true,
    sortField: { field: 'text', direction: 'asc' },
    load: async (query, callback) => {
        if (!query) return callback();

        try {
            const token = await getSpotifyAccessToken();
            const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=1`;
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            const artists = data.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images[0]?.url || ''
            }));

            callback(artists);
        } catch (err) {
            console.error('Erro ao buscar artistas:', err);
            callback();
        }
    },
    render: {
        option: (item, escape) => `
            <div class="d-flex align-items-center">
                <img src="${item.image}"
                    style="width:32px;height:32px;border-radius:50%;margin-right:8px;">
                <span>${escape(item.name)}</span>
            </div>
        `,
        item: (item, escape) => `<div>${escape(item.name)}</div>`
    }
});

document.getElementById('modo-zoom').addEventListener('click', () => {
    const selectedId = select.tomselect.getValue();

    if (!selectedId) {
        alert('Selecione um artista para começar!');
        return;
    }

    const url = `zoom.html?artist=${selectedId}`;
    window.location.href = url;
});
