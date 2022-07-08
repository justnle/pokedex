import { useEffect, useState } from 'react';
import Card from './Card';
import Detail from './Detail';
import Header from './Header';
import Modal from './Modal';

type Props = {
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

        const getCaptureData = () => {
            const capturedPokemonList = localStorage.getItem(`capturedPokemon`);

            if (capturedPokemonList) {
                setCapturedPokemon(JSON.parse(capturedPokemonList));
            }
        };

        getCaptureData();
    }, [props.pokemonList, showModal]);

    const getDetailInfo = (pokemonInfo: Object) => {
        setDetailInfo(pokemonInfo);
    };

    return (
        <div className="main-container pb-10 flex">
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
                        className="detail-container m-height-[1px]"
                        style={{ minWidth: '360px' }}
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
                            onClick={() => {
                                setShowModal(true);
                                document.body.style.overflow = 'hidden';
                            }}
                            {...detailInfo}
                            captured={capturedPokemon}
                        />
                    </div>
                ) : null}
            </div>
            {showModal ? (
                <div
                    className="modal-container fixed top-0 w-full h-full bg-black/60"
                    onClick={(event) => {
                        const modal = document.querySelector(`.modal`);

                        if (event.target === modal) {
                            setShowModal(false);
                            document.body.style.overflow = 'unset';
                        }
                    }}
                >
                    <Modal
                        onClick={() => {
                            setShowModal(false);
                            document.body.style.overflow = 'unset';
                        }}
                        {...detailInfo}
                    />
                </div>
            ) : null}
        </div>
    );
}
