import { isAbsolute } from 'node:path/win32';
import pokedexLogo from '../assets/pokedex_logo.png';
import pokeball from '../assets/pokeball.png';

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
            <div className="logo">
                <img src={pokedexLogo} alt="pokemon-logo" />
            </div>
            <div className="captured-button flex flex-row h-[72px] w-[420px] my-auto rounded-full bg-pokemon-red">
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
        </div>
    );
}
