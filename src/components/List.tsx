import { useEffect, useState } from 'react';
import Card from './Card';
import Detail from './Detail';
import Header from './Header';
import Modal from './Modal';

export default function List(props: any) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [detailState, setDetailState] = useState<Boolean>(false);
    const [showModal, setShowModal] = useState<Boolean>(false);

    const handleOnCapture = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setPokemonList(props.pokemonList);
    }, [props.pokemonList]);

    return (
        <div className="main-container flex relative">
            <div className="list-container flex flex-row">
                <div className="container-lg">
                    <Header />
                    <div className="card-container flex flex-row flex-wrap justify-center gap-6 xl:gap-10">
                        {!pokemonList ? (
                            <div>No Pokemon List to Render</div>
                        ) : (
                            pokemonList.map((pokemon: any, index: number) => {
                                return (
                                    <Card
                                        key={`${pokemon[`name`]}-${index}`}
                                        {...pokemon}
                                        useCache={false}
                                        onClick={() => {
                                            console.log(pokemon.name);

                                            detailState
                                                ? setDetailState(false)
                                                : setDetailState(true);
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                {detailState ? (
                    <div className="detail-container">
                        <Detail
                            onClick={() => {
                                console.log(`capture me`);
                                setShowModal(true);
                            }}
                        />
                    </div>
                ) : null}
            </div>
            <div className="modal-container absolute">
                {showModal ? <Modal /> : null}
            </div>
        </div>
    );
}
