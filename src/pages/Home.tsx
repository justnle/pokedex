import Header from '../components/Header';
import Scroller from '../components/Scroller';

export default function Home() {
    return (
        <div className="home">
            <Scroller useCache={true} />
        </div>
    );
}
