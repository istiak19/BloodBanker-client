import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import Contact from "../../Components/Contact/Contact";
import Featured from "../../Components/Featured/Featured";
import Newsletter from "../../Components/Newsletter/Newsletter";
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BloodBanker</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <Contact></Contact>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;