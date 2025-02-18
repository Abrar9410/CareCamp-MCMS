import { MdAccessTime, MdDateRange, MdOutlineReadMore } from "react-icons/md";
import useCamps from "../hooks/useCamps";
import Heading from "./shared/Heading";
import Loading from "./shared/Loading";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


const PopularCamps = () => {

    const { camps, isPending } = useCamps(6);
    const navigate = useNavigate();

    if (isPending) return <Loading></Loading>;

    return (
        <>
            <Heading title="Popular Camps"></Heading>
            <p className="text-center text-black/80 dark:text-white/80 w-11/12 min-[400px]:w-9/12 sm:w-2/3 mx-auto mt-3 mb-6">Check out the most popular camps where people are rushing to take service!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {camps.map((camp,idx) => 
                    <div key={idx} className="p-2 min-[300px]:p-3 min-[400px]:p-4 lg:p-6 xl:p-4 2xl:p-6 flex flex-col gap-4 rounded-xl dark:bg-black border border-primary shadow-xl">
                        <div className="rounded-xl h-[100vw] min-[250px]:h-[85vw] min-[320px]:h-[70vw] min-[400px]:h-[60vw] min-[500px]:h-[55vw] md:h-[24vw] xl:h-[16vw]">
                            <img src={camp.thumbnail} alt="Camp_Photo" className="w-full h-full rounded-xl object-cover"/>
                        </div>
                        <h3 className="text-black dark:text-white max-[286px]:text-base text-lg min-[400px]:text-xl md:text-base min-[900px]:text-lg 2xl:text-2xl font-semibold">{camp.title}</h3>
                        <div className="space-y-3">
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2 md:gap-1">
                                    <MdDateRange />
                                    <span>{camp.date}</span>
                                </p>
                                <p className="flex items-center gap-2 md:gap-1">
                                    <MdAccessTime className="max-[286px]:text-sm sm:text-lg"/>
                                    <span>{camp.time}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2 md:gap-1">
                                    <FaLocationDot />
                                    <span>{camp.location}</span>
                                </p>
                                <p className="flex items-center gap-2 md:gap-1">
                                    <IoIosPeople className="max-[286px]:text-sm sm:text-lg"/>
                                    <span>{camp.participants}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2 md:gap-1">
                                    <FaUserDoctor />
                                    <span>{camp.hpName}</span>
                                </p>
                                <p className="flex items-center gap-2 md:gap-1">
                                    <TbCoinTakaFilled className="max-[286px]:text-sm sm:text-lg"/>
                                    <span>{camp.fee}</span>
                                </p>
                            </div>
                        </div>
                        <button onClick={()=>navigate(`/camp-details/${camp._id}`)} className="w-full flex justify-center items-center gap-1 rounded-lg py-2 bg-primary text-white text-lg font-semibold hover:bg-white hover:text-primary outline-none">
                            Details
                            <MdOutlineReadMore className="text-3xl"/>
                        </button>
                    </div>
                )}
            </div>
            <div className="w-max mx-auto mt-8 mb-6">
                <button onClick={() => navigate('/camps')} className="w-max mx-auto bg-green-500 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 outline-none">See All Camps</button>
            </div>
        </>
    );
};

export default PopularCamps;