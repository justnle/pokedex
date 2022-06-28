import axios from 'axios';
import { readFromCache, writeToCache } from './cache';

const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`;

// export async function getPokemon() {
//     return await axios.get(API).then((res) => {
//         return res.data;
//     });
// }

const getPokemon = async (cacheResponse = false) => {
    const { data } = await axios.get(API_URL);
    console.log(`making api call`);

    cacheResponse && writeToCache(API_URL, data);

    return data;
};

const getCachedPokemon = () => readFromCache(API_URL);

export { getPokemon, getCachedPokemon };
