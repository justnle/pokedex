import axios from 'axios';

const getPokemonData = async (url: string) => {
    return await axios.get(url).then((res) => {
        return res.data;
    });
};

export { getPokemonData };
