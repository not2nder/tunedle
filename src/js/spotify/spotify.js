import axios from 'axios';
import 'dotenv';

export const getSpotifyAccessToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const authHeader = btoa(`${clientId}:${clientSecret}`);

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter token:', error.response?.data || error.message);
    }
};

export const getArtistAlbums = async (artistId) => {
    const token = await getSpotifyAccessToken();
    if (!token) {
        console.log("Erro: Não foi possível obter o token de acesso.");
        return [];
    }

    try {
        const limit = 50;
        let offset = 0;
        let allAlbums = [];
        let hasMore = true;

        while (hasMore) {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    include_groups: 'album,single',
                },
            });

            const items = response.data.items;
            allAlbums = [...allAlbums, ...items];
            hasMore = items.length === limit;
            offset += limit;
        }

        return allAlbums;
    } catch (error) {
        console.error('Erro ao buscar álbuns:', error.response?.data || error.message);
        return [];
    }
};

export async function getArtistInfo(id) {
    const token = await getSpotifyAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}


export function escolherAlbumAleatorio(albuns) {
    return albuns[Math.floor(Math.random() * albuns.length)];
}
