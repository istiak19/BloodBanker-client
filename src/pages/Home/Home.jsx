import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import Featured from "../../Components/Featured/Featured";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Review from "../../Components/Review/Review";
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BloodBanker</title>
            </Helmet>
            <Banner />
            <Featured />
            <Review />
            <Newsletter />
        </div>
    );
};

export default Home;