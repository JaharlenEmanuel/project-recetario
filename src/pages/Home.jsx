import SearchBar from '../components/Search';
import Carousel from '../components/Carousel';
import CategoryButtons from '../components/Categories/CategoryButtons';
import CategoriesContainer from '../components/Categories/CategoriesContainer';
import { useScrollToSection } from '../components/useScrollToSection';


export default function Home() {
    const { sectionRef, scrollToSection } = useScrollToSection();

    return (
        <>
            <div ref={sectionRef}>
                <SearchBar />
                <Carousel />
                <CategoriesContainer />
            </div>
        </>
    );
}