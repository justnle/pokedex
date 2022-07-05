import pokedexLogo from '../assets/pokedex_logo.png';
import pokeball from '../assets/pokeball.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header flex flex-row justify-between mt-[48px] mb-[36px]">
            <Link to="/">
                <div className="logo">
                    <img src={pokedexLogo} alt="pokemon-logo" />
                </div>
            </Link>
            <div className="button-container my-auto h-[72px] w-[420px]">
                <Link to="/captured">
                    <div className="captured-button flex flex-row bg-pokemon-red rounded-[100px]">
                        <div className="pokeball">
                            <img
                                src={pokeball}
                                alt="pokeball"
                                className="h-[72px] w-[72px]"
                            />
                        </div>
                        <div className="captured-text text-white text-[36px] font-[590] my-auto">
                            <span>Captured Pokemons</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
