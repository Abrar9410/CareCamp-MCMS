import { useRef, useState } from "react";
import useCamps from "../../hooks/useCamps";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/shared/Heading";
import { MdAccessTime, MdDateRange, MdOutlineReadMore } from "react-icons/md";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { TbCoinTakaFilled } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";


const AvailableCamps = () => {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const { camps, isPending } = useCamps('', search, sort);
    const [changeLayout, setChangeLayout] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef();

    if (isPending) return <Loading></Loading>;

    return (
        <>
            <Helmet><title>CareCamp | Available Camps</title></Helmet>
            <Heading title="All Available Camps"></Heading>
            <p className="text-center text-black/80 dark:text-white/80 w-11/12 min-[400px]:w-9/12 sm:w-2/3 mx-auto mt-3 mb-6">
                Check out the all medical camps here. Choose what service you need and where to get it. You may
                start by writing something on the search bar!
            </p>
            <div className="w-11/12 md:w-10/12 mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 my-8 sm:my-12">
                <div className="form-control w-full md:w-2/3 xl:w-1/2 relative">
                    <input
                        defaultValue={search}
                        ref={searchRef}
                        type="text"
                        placeholder="Search by Camp Name, Location, Date or Doctor's Name"
                        className="input input-bordered h-12 w-full bg-white dark:bg-black text-black dark:text-white sm:text-sm lg:text-base"
                    />
                    <button
                        onClick={() => setSearch(searchRef.current.value)}
                        className="absolute h-12 w-12 rounded-r-xl flex justify-center items-center bg-gray-200 text-black right-0 top-0">
                        <FaSearch />
                    </button>
                </div>
                <div className="w-max">
                    <select
                        name='category'
                        id='category'
                        onChange={e => setSort(e.target.value)}
                        className='border w-max px-2 lg:px-4 h-12 rounded-xl bg-white dark:bg-black text-black dark:text-white text-xs min-[300px]:text-sm lg:text-base cursor-pointer'
                        value={sort}
                    >
                        <option value=''>Sort By</option>
                        <option value='participants'>Most Registered <span className="text-sm">(high-low)</span></option>
                        <option value='fee'>Camp Fees <span className="text-sm">(low-high)</span></option>
                        <option value='title'>Alphabet <span className="text-sm">(A-Z)</span></option>
                    </select>
                </div>
            </div>
            <div className="hidden w-11/12 md:w-10/12 mx-auto xl:flex justify-end mb-8">
                <button onClick={()=>setChangeLayout(!changeLayout)} className="w-max px-4 h-14 bg-purple-600 text-white text-lg outline-none rounded-lg hover:scale-105 shadow-md">Change Layout</button>
            </div>
            <div className={`w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 mb-12 ${changeLayout ? 'xl:grid-cols-2 xl:gap-16' : 'xl:grid-cols-3 xl:gap-6'}`}>
                {camps.map(camp =>
                    <div key={camp._id} className="p-2 min-[300px]:p-3 min-[400px]:p-4 lg:p-6 xl:p-4 2xl:p-6 flex flex-col gap-4 rounded-xl dark:bg-black border border-primary shadow-xl">
                        <div className="rounded-xl h-[100vw] min-[250px]:h-[85vw] min-[320px]:h-[70vw] min-[400px]:h-[60vw] min-[500px]:h-[55vw] md:h-[24vw] xl:h-[16vw]">
                            <img src={camp.thumbnail} alt="Camp_Photo" className="w-full h-full rounded-xl object-cover" />
                        </div>
                        <h3 className="text-black dark:text-white max-[286px]:text-base text-lg min-[400px]:text-xl md:text-base min-[900px]:text-lg 2xl:text-2xl font-semibold">{camp.title}</h3>
                        <div className="space-y-3">
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2 md:gap-1">
                                    <MdDateRange />
                                    <span>{camp.date}</span>
                                </p>
                                <p className="flex items-center gap-2 md:gap-1">
                                    <MdAccessTime className="max-[286px]:text-sm sm:text-lg" />
                                    <span>{camp.time}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2">
                                    <FaLocationDot />
                                    <span>{camp.location}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <IoIosPeople className="max-[286px]:text-sm sm:text-lg" />
                                    <span>{camp.participants}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-0 md:gap-1 max-[286px]:text-xs max-[400px]:text-sm md:text-xs min-[900px]:text-sm text-black dark:text-white">
                                <p className="sm:w-9/12 md:w-[67%] flex items-center gap-2">
                                    <FaUserDoctor />
                                    <span>{camp.hpName}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <TbCoinTakaFilled className="max-[286px]:text-sm sm:text-lg" />
                                    <span>{camp.fee}</span>
                                </p>
                            </div>
                        </div>
                        <button onClick={() => navigate(`/camp-details/${camp._id}`)} className="w-full flex justify-center items-center gap-1 rounded-lg py-2 bg-primary text-white text-lg font-semibold hover:bg-white hover:text-primary outline-none">
                            Details
                            <MdOutlineReadMore className="text-3xl" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AvailableCamps;