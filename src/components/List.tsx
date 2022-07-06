import { useEffect, useState } from 'react';
import Card from './Card';
import Detail from './Detail';
import Header from './Header';
import Modal from './Modal';

type Props = {
    useCache: boolean;
    pokemonList: Array<Object>;
};

export default function List(props: Props): JSX.Element {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [showDetail, setShowDetail] = useState<Boolean>(false);
    const [detailInfo, setDetailInfo] = useState<Object>({});
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [capturedPokemon, setCapturedPokemon] = useState([]);

    useEffect(() => {
        setPokemonList(props.pokemonList);

        const capturedPokemonList = localStorage.getItem('capturedPokemon');

        if (capturedPokemonList) {
            setCapturedPokemon(JSON.parse(capturedPokemonList));
        }
    }, [props.pokemonList]);

    const getDetailInfo = (pokemonInfo: Object) => {
        setDetailInfo(pokemonInfo);
    };

    return (
        <div className="page-container">
            <div className="detail-list-container flex">
                <div className="header-list-container-lg px-10">
                    <Header catchButton={true} />
                    <div className="card-container flex flex-row flex-wrap justify-between gap-6 xl:gap-10">
                        {!pokemonList ? (
                            <div>No Pokemon List to Render</div>
                        ) : (
                            pokemonList.map((pokemon: any, index: number) => {
                                return (
                                    <Card
                                        key={`${pokemon[`name`]}-${index}`}
                                        {...pokemon}
                                        useCache={false}
                                        pokemonInfo={getDetailInfo}
                                        onClick={() => {
                                            setShowDetail(true);
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                {showDetail ? (
                    <div
                        className="detail-container pr-8"
                        onClick={(event) => {
                            const button = document.querySelector(
                                `.detail-capture-button`
                            );

                            if (event.target !== button) {
                                setShowDetail(false);
                            }
                        }}
                    >
                        <Detail
                            onClick={() => setShowModal(true)}
                            {...detailInfo}
                            captured={capturedPokemon}
                        />
                    </div>
                ) : null}
            </div>
            {showModal ? (
                <div className="modal-container absolute w-full h-full bg-black/60">
                    <Modal
                        onClick={() => {
                            setShowModal(false);
                        }}
                        {...detailInfo}
                    />
                </div>
            ) : null}
        </div>
    );
}
