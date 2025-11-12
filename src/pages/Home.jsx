import SearchBar from '../components/Search';
import Carousel from '../components/Carousel';
import CategoryButtons from '../components/Categories/CategoryButtons'; 


export default function Home() {
    return (
       <>
       <div>
       <SearchBar />
       <Carousel />
        <CategoryButtons/>
        </div>
       </>
    );
}