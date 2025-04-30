import { setAlbum, setAlbuns, albunsAtual, albumAtual,tentativas, inicioJogo, diminuirVidas, getVidas, adivinhado, pulos, diminuirPulos } from '@js/config/gameConfig.js';
import { preencherSelect, exibirCapa, atualizarVidas} from '@js/script.js';
import { getArtistAlbums, escolherAlbumAleatorio} from '@js/spotify/spotify.js';
import { mostrarResposta } from '@js/script.js';

export async function modoZoom(idArtista) {
    inicioJogo();

    const divResposta = document.getElementById('resposta');
    const imgCapa = document.getElementById('capa');
    const btnProximo = document.getElementById('proximo-album');
    const btnPular = document.getElementById('pular-album');
    const divLoading = document.getElementById('carregando');
    const divConteudo = document.getElementById('conteudo');
    const ulTentativas = document.getElementById('tentativas');
    const selectAlbum = document.getElementById('album-select')?.tomselect;

    ulTentativas.innerHTML = '';
    divResposta?.classList.add('d-none');
    imgCapa.style.transform = `scale(${tentativas})`;

    if (btnProximo) btnProximo.disabled = true;
    if (selectAlbum) selectAlbum.enable?.();
    if(btnPular) btnPular.textContent = `PULAR (${pulos})`

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
        alert('Você chegou ao fim da discogradia desse artista!');
        selectAlbum?.disable?.();
        return;
    }

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

    if (btnPular && !adivinhado && pulos > 0) {
        btnPular.disabled = false;
        btnPular.onclick = () => {
            mostrarResposta(albumAtual.name);
            diminuirVidas();
            atualizarVidas();
            if (getVidas() > 0) btnProximo.disabled = false;
            btnPular.disabled = true;
            diminuirPulos();
            btnPular.textContent = `PULAR (${pulos})`
        };
    }
}