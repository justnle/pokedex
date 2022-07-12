import { SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import pokedexLogo from '../assets/pokedex_logo.png';
import pokeball from '../assets/pokeball.png';

type Props = {
    catchButton: boolean;
    homePageList?: Array<Object>;
    showHomePage?: (setPokemonList: SetStateAction<Array<Object>>) => void;
    showPrevious?: (setShowPrevious: SetStateAction<Boolean>) => void;
};

export default function Header(props: Props): JSX.Element {
    return (
        <div className="header flex flex-row justify-between mt-[48px] mb-[36px]">
            <Link
                to="/"
                onClick={() => {
                    props.showHomePage!(props.homePageList!);
                    props.showPrevious!(false);
                }}
            >
                <div className="logo">
                    <img src={pokedexLogo} alt="pokemon-logo" />
                </div>
            </Link>
            {props.catchButton ? (
                <div className="button-container my-auto h-[72px] w-[420px] rounded-[100px] overflow-hidden">
                    <Link to="/captured">
                        <div className="captured-button flex flex-row bg-pokemon-red">
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
            ) : null}
        </div>
    );
}
