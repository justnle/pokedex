import axios from 'axios';

const API = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`;

export async function getPokemon() {
    return await axios.get(API).then((res) => {
        return res.data;
    });
}
