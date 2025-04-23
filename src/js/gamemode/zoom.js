import {setAlbum, setAlbuns, albunsAtual, albumAtual,tentativas, inicioJogo} from '../config/gameConfig.js';
import {preencherSelect, exibirCapa, atualizarVidas} from '../script.js';
import {getArtistAlbums, escolherAlbumAleatorio} from '../spotify/spotify.js';

export async function modoZoom(idArtista) {
    inicioJogo();

    const resposta        = document.getElementById('resposta');
    const imagem          = document.getElementById('capa');
    const proximoAlbumBtn = document.getElementById('proximo-album');
    const carregando      = document.getElementById('carregando');
    const conteudo        = document.getElementById('conteudo');

    resposta.classList.add('d-none');
    proximoAlbumBtn.style.display = 'none';

    if (tentativas >= 1) {
        imagem.style.transform = `scale(${tentativas})`;
    }

    if (!albunsAtual || albunsAtual.length === 0) {
        const lista = await getArtistAlbums(idArtista);
        setAlbuns(lista);
    }

    // Remover álbum atual da lista p n repetir
    if (albumAtual) {
        const novaLista = albunsAtual.filter(album => album.id !== albumAtual.id);
        setAlbuns(novaLista);
    }

    if (!albunsAtual || albunsAtual.length === 0) {
        alert('Você já acertou todos os álbuns desse artista!');
        return;
    }

    const novoAlbum = escolherAlbumAleatorio(albunsAtual);
    setAlbum(novoAlbum);

    preencherSelect(albunsAtual);
    exibirCapa(novoAlbum);
    atualizarVidas();

    if (carregando) carregando.remove();
    if (conteudo) conteudo.style.display = '';
}
