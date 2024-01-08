import FeatureListSection from "../components/home/FeatureListSection";
import FeatureListSection2 from "../components/home/FeatureListSection2";
import FeatureListSection3 from "../components/home/FeatureListSection3";
import Footer from "../components/home/Footer";
import Header from "../components/home/header";

const IndexPage = () => {
    return (
        <div>
            <Header />
            <FeatureListSection3 />
            <FeatureListSection />
            <FeatureListSection2 />
            <Footer />
        </div>
    );
};

export default IndexPage;
