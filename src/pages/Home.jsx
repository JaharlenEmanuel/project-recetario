import SearchBar from '../components/Search';
import Carousel from '../components/Carousel';
import CategoriesContainer from '../components/Categories/CategoriesContainer';


export default function Home() {
    return (
        <>
            <div>
                <SearchBar />
                <Carousel />
                <CategoriesContainer />
            </div>
        </>
    );
}