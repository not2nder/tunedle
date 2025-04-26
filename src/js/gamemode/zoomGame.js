import {setAlbum, setAlbuns, albunsAtual, albumAtual,tentativas, inicioJogo} from '@js/config/gameConfig.js';
import {preencherSelect, exibirCapa, atualizarVidas} from '@js/script.js';
import {getArtistAlbums, escolherAlbumAleatorio} from '@js/spotify/spotify.js';

export async function modoZoom(idArtista) {
    inicioJogo();

    const divResposta = document.getElementById('resposta');
    const imgCapa = document.getElementById('capa');
    const btnProximo = document.getElementById('proximo-album');
    const divLoading = document.getElementById('carregando');
    const divConteudo = document.getElementById('conteudo');
    const ulTentativas = document.getElementById('tentativas');
    const selectAlbum = document.getElementById('album-select')?.tomselect;

    ulTentativas.innerHTML = '';
    divResposta?.classList.add('d-none');

    if (btnProximo) btnProximo.style.display = 'none';
    if (selectAlbum) selectAlbum.enable?.();

    if (!albunsAtual || albunsAtual.length === 0) {
        const listaAlbuns = await getArtistAlbums(idArtista);
        setAlbuns(listaAlbuns);
    }

    // Remove o álbum atual da lista para não repetir
    if (albumAtual) {
        const novaLista = albunsAtual.filter(album => album.id !== albumAtual.id);
        setAlbuns(novaLista);
    }

    // Fim do jogo
    if (!albunsAtual || albunsAtual.length === 0) {
        alert('Você já acertou todos os álbuns desse artista!');
        selectAlbum?.disable?.();
        return;
    }

    imgCapa.style.transform = `scale(${tentativas})`;

    // Escolhe novo álbum e atualiza configs
    const novoAlbum = escolherAlbumAleatorio(albunsAtual);
    setAlbum(novoAlbum);

    preencherSelect(albunsAtual);
    exibirCapa(novoAlbum);
    atualizarVidas();

    divLoading?.remove();
    if (divConteudo) divConteudo.style.display = '';

    btnProximo?.addEventListener('click', () => {
        modoZoom(idArtista);
    }, { once: true });
}