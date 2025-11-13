import SearchBar from '../components/Search';
import Carousel from '../components/Carousel';
import CategoriesContainer from '../components/Categories/CategoriesContainer';
import { useScrollToSection } from '../components/useScrollToSection';


export default function Home() {
    const { sectionRef, scrollToSection } = useScrollToSection();

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