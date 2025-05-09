import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import Featured from "../../Components/Featured/Featured";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Review from "../../Components/Review/Review";
import StatsSection from "../../Components/StatsSection/StatsSection";
import EventsSection from "../../Components/EventsSection/EventsSection";
import BlogSection from "../../Components/BlogSection/BlogSection";
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BloodBanker</title>
            </Helmet>
            <Banner />
            <Featured />
            <StatsSection />
            <EventsSection />
            <Review />
            <BlogSection />
            <Newsletter />
        </div>
    );
};

export default Home;