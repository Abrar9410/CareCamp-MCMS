import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { getMostVisitedDistrict } from "../../../utilities/utilities";
import AnalyticsCharts from "../../../components/AnalyticsCharts";


const Analytics = () => {

    const { user, isDarkMode } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [totalCampsAttended, setTotalCampsAttended] = useState(null);
    const [totalAmountSpent, setTotalAmountSpent] = useState(null);
    const [mostVisitedLocation, setMostVisitedLocation] = useState('');
    const [mostExpensiveCamp, setMostExpensiveCamp] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure(`/payment-history/${user.email}`)
            .then(res => {
                setPaymentHistory(res.data);
                setTotalCampsAttended(res.data.length);
                setTotalAmountSpent(res.data.reduce((acc, curr) => acc + curr.fee, 0));
                setMostVisitedLocation(getMostVisitedDistrict(res.data));
                setMostExpensiveCamp(res.data.find(entry => entry.fee === Math.max(...res.data.map(camp => camp.fee))));
                setIsLoading(false);
            })
    }, [])

    isLoading && <Loading></Loading>

    return (
        <>
            <Helmet><title>Analytics | CareCamp</title></Helmet>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 mb-20">
                <div className="flex flex-col items-center gap-2 p-8 rounded-xl shadow-lg bg-green-600 text-black dark:text-white">
                    <p className="text-center text-lg md:text-xl font-semibold">Total Camps Attended</p>
                    <p className="text-center text-3xl font-bold">{totalCampsAttended || 0}</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-8 rounded-xl shadow-lg bg-orange-600 text-black dark:text-white">
                    <p className="text-center text-lg md:text-xl font-semibold">Total Amount Spent</p>
                    <p className="text-center text-3xl font-bold">{totalAmountSpent || 0}</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-8 rounded-xl shadow-lg bg-yellow-600 text-black dark:text-white">
                    <p className="text-center text-lg md:text-xl font-semibold">Most Visited Location</p>
                    <p className="text-center text-3xl font-bold">{mostVisitedLocation || "N/A"}</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-8 rounded-xl shadow-lg bg-red-600 text-black dark:text-white">
                    <p className="text-center text-lg md:text-xl font-semibold">Most Expensive Camp</p>
                    <p className="text-center text-3xl font-bold">{mostExpensiveCamp.registeredCampName || "N/A"}</p>
                </div>
            </div>
            <AnalyticsCharts paymentHistory={paymentHistory}></AnalyticsCharts>
        </>
    );
};

export default Analytics;