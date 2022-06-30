import axios from 'axios';
import { readFromCache, writeToCache } from './cache';

const getPokemonData = async (url: string, cacheResponse = false) => {
    if (cacheResponse) {
        const cachedData = getCachedPokemonData(url);

        if (cachedData) {
            return cachedData;
        }
    } else {
        return await axios.get(url).then((res) => {
            console.log(`making api call`);

            cacheResponse && writeToCache(url, res.data);

            return res.data;
        });
    }
    // return await axios.get(url).then((res) => {
    //     console.log(`making api call`);

    //     cacheResponse && writeToCache(url, res.data);

    //     return res.data;
    // });
};

const getCachedPokemonData = (url: string) => readFromCache(url);

export { getCachedPokemonData, getPokemonData };
