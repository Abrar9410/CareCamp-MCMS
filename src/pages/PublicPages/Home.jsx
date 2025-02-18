import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner";
import PopularCamps from "../../components/PopularCamps";
import FeedbackRating from "../../components/FeedbackRating";


const Home = () => {
    return (
        <>
        <Helmet><title>CareCamp | Home</title></Helmet>
        <div className="w-11/12 md:w-10/12 mx-auto">
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <FeedbackRating></FeedbackRating>
        </div>
        </>
    );
};

export default Home;