import { useEffect, useState } from 'react';
import Card from './Card';
import Detail from './Detail';
import Header from './Header';
import Modal from './Modal';

export default function List(props: any) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [showDetail, setShowDetail] = useState<Boolean>(false);
    const [detailInfo, setDetailInfo] = useState<Object>({});
    const [showModal, setShowModal] = useState<Boolean>(false);

    useEffect(() => {
        setPokemonList(props.pokemonList);
    }, [props.pokemonList]);

    const getDetailInfo = (pokemonInfo: Object) => {
        setDetailInfo(pokemonInfo);
    };

    return (
        <div className="page-container flex relative">
            <div className="detail-list-container flex flex-row">
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
                        onClick={() => setShowDetail(false)}
                    >
                        <Detail
                            onClick={() => setShowModal(true)}
                            {...detailInfo}
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
