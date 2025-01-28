import { useLoaderData } from "react-router-dom";
import Heading from "../../components/shared/Heading";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import JoinModal from "../../components/shared/JoinModal";
import { useEffect, useState } from "react";


const Camp = () => {

    const camp = useLoaderData();
    const { _id, title, thumbnail, description, location, date, time, participants, hpName, fee } = camp;
    const {user, userRegisteredCamps} = useAuth();
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const joinedCamp = userRegisteredCamps.find(camp => camp.campName === title);
        if (joinedCamp) {
            setJoined(true);
        }
    }, [userRegisteredCamps])

    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <Heading title="Camp Details"></Heading>
            <hr className="border-2 border-primary mt-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 dark:bg-black lg:shadow-lg mb-8 sm:mb-12">
                <div className="rounded-xl">
                    <img src={thumbnail} alt="Camp_Photo" className="w-full h-full rounded-xl object-cover" />
                </div>
                <div className="px-1 min-[300px]:px-2 min-[400px]:px-3 sm:px-4 pb-8 lg:py-4 lg:pr-8">
                    <h2 className="text-center font-bold text-black dark:text-white min-[300px]:text-lg min-[450px]:text-xl sm:text-2xl lg:text-3xl">
                        {title}
                    </h2>
                    <p className="my-4 text-black/80 dark:text-white/80 text-center">{description}</p>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-primary w-full text-center text-black dark:text-white">
                            <tbody>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Location</td>
                                    <td className="border border-primary p-2">{location}</td>
                                </tr>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Date</td>
                                    <td className="border border-primary p-2">{date}</td>
                                </tr>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Time</td>
                                    <td className="border border-primary p-2">{time}</td>
                                </tr>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Participants</td>
                                    <td className="border border-primary p-2">{participants}</td>
                                </tr>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Healthcare Professional</td>
                                    <td className="border border-primary p-2">{hpName}</td>
                                </tr>
                                <tr>
                                    <td className="border border-primary p-2 font-bold">Fee</td>
                                    <td className="border border-primary p-2">{fee}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col justify-end items-center mt-8 sm:mt-10 md:mt-12 2xl:mt-36">
                        <button
                            disabled={!user || joined}
                            onClick={() => document.getElementById(`${_id}`).showModal()}
                            className="w-max flex justify-center items-center gap-1 rounded-lg px-4 py-2 bg-primary text-white text-lg font-semibold hover:scale-105 outline-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100">
                            Join Camp
                            <FaPlus />
                        </button>
                        {!user && <p className="text-center text-red-500">Only logged in users can join camps</p>}
                    </div>
                </div>
            </div>
            <JoinModal camp={camp}></JoinModal>
        </div>
    );
};

export default Camp;