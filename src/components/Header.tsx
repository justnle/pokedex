import pokedexLogo from '../assets/pokedex_logo.png';
import pokeball from '../assets/pokeball.png';
import { Link } from 'react-router-dom';

interface Style {
    [key: string]: string;
}

const headerStyle: Style = {
    // position: 'absolute',
    // width: '331.71px',
    // height: '120px',
    // left: '36px',
    // top: '48px',
    marginTop: '48px',
    marginBottom: '36px'
};

export default function Header() {
    return (
        <div
            className="header flex flex-row justify-between"
            style={headerStyle}
        >
            <Link to="/">
                <div className="logo">
                    <img src={pokedexLogo} alt="pokemon-logo" />
                </div>
            </Link>
            <div className="button-container my-auto h-[72px] w-[420px]">
                <Link to="/captured">
                    <div className="captured-button flex flex-row bg-pokemon-red rounded-full">
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
