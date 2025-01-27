import { Helmet } from "react-helmet-async";
import PopularCamps from "../../components/PopularCamps";


const Home = () => {
    return (
        <>
        <Helmet><title>CareCamp | Home</title></Helmet>
            <div className="w-11/12 md:w-10/12 mx-auto">
            <PopularCamps></PopularCamps>
        </div>
        </>
    );
};

export default Home;