import { getSpotifyAccessToken } from '@js/spotify/spotify.js';
import '@styles/global.css';

import TomSelect from 'tom-select';

document.querySelector('#app').innerHTML = `
  <div class="page d-flex flex-column min-vh-100" style="background: linear-gradient(45deg,rgba(139, 206, 151, 1) 0%, rgba(26, 123, 127, 1) 41%, rgba(6, 70, 107, 1) 100%)">
    <main class="page-container px-3 flex-grow-1">
      <div>
        <h1 class="pulse main-text" id="text-pulse"></h1>
      </div>
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card card-hover p-4 d-flex flex-column justify-content-between">
            <div>
              <h3>🎮 Tunedle🎵</h3>
              <p>
                Tente adivinhar o nome de um álbum apenas olhando a capa — quanto mais rápido, melhor!
                No <strong>Modo Zoom</strong>, a imagem é revelada aos poucos... consegue acertar antes de ver tudo?
              </p>
              <p>
                Mais modos em breve!
              </p>
              <p class="text-muted small">
                Versão 1.0 • Desenvolvido por <strong>not2nder</strong>.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card card-hover p-4 h-100">
            <h4 class="mb-3">🎧 Modos de Jogo</h4>
            <div class="py-3">
                <span>Antes de selecionar um modo, escolha um artista</span>
                <select id="artist-select" class="tom-select" placeholder="🔎 Procure um Artista"></select>
            </div>

            <ul class="p-0">
              <li class="mb-3">
                <button class="btn w-100 button-30 easy" id="modo-zoom" role="button">
                  <strong>MODO ZOOM 🔎</strong>
                  <span class="small">Descubra o álbum pela capa</span>
                </button>
              </li>
            </ul>
          </div>
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

const select = document.getElementById('artist-select');

const frases = [
  "O som está nos detalhes",
  "Quantos álbuns você conhece de verdade?",
  "Treine seus ouvidos e sua memória!",
  "Quando a capa diz tudo — ou quase tudo",
  "Errar também faz parte da música",
  "Nem sempre é tão fácil quanto parece!",
  "Feito com bugs, amor e muita música.",
  "Este jogo teve mais versões que álbuns remasterizados.",
  "Atualizações frequentes... igual playlist de fim de semana.",
  "Descubra, adivinhe, desafine!",
  "Alguns álbuns envelhecem como vinho... outros como leite",
  "Nem toda capa famosa é tão fácil de reconhecer!",
  "Um dia sem música é um dia perdido",
  "Jogue com seu artista favorito!",
  "Mostre que você conhece cada álbum!",
  "O próximo hit pode estar a um follow de distância.",
  "Siga o desenvolvedor"
];

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