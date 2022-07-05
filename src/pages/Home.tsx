import Scroller from '../components/Scroller';

export default function Home(): JSX.Element {
    return (
        <div className="home">
            <Scroller useCache={false} />
        </div>
    );
}
