import Heading from "../../../components/shared/Heading";
import DataTable from "react-data-table-component";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const PaymentHistory = () => {

    const { user, isDarkMode } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setIsLoading(true);
        axiosSecure(`/payment-history/${user.email}?search=${search}`)
            .then(res => {
                setPaymentHistory(res.data);
                setIsLoading(false);
            })
    }, [search])

    const columns = [
        {
            name: "Camp Name",
            selector: (row) => row.registeredCampName,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center font-semibold text-sm p-2">{row.registeredCampName}</p>),
            minWidth: "140px",
        },
        {
            name: "Location",
            selector: (row) => row.location,
            cell: (row) => <span className="w-max mx-auto text-center text-sm">{row.location}</span>,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "Health. Professional",
            selector: (row) => row.hpName,
            cell: (row) => (<p className="w-max mx-auto text-center">{row.hpName}</p>),
            sortable: true,
            minWidth: "129px",
            maxWidth: "230px"
        },
        {
            name: "Payment Date",
            selector: (row) => row.date_time,
            sortable: true,
            cell: (row) => (
                <p className="w-max mx-auto flex flex-col items-center gap-1">
                    <span>{row.date_time.slice(0, 10)}</span>
                    <span>{row.date_time.slice(11, 19)}</span>
                </p>
            ),
            minWidth: "115px",
            maxWidth: "200px"
        },
        {
            name: "Fee",
            selector: (row) => row.fee,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center text-sm">{row.fee}</p>),
            maxWidth: "120px",
        },
        {
            name: "Transaction ID",
            selector: (row) => row.transactionId,
            cell: (row) => (<p className="w-max mx-auto text-center text-sm">{row.transactionId}</p>),
            sortable: true,
            minWidth: "120px"
        },
    ];

    const tableStyles = {
        table: {
            style: {
                tableLayout: "auto"
            }
        },
        headCells: {
            style: {
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: isDarkMode ? "gray" : "#f3f4f6",
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                fontSize: "1.12rem",
                border: "1px solid #0077B6",
                padding: "7px 0"
            },
        },
        cells: {
            style: {
                display: "flex",          // Ensure the cells use Flexbox
                alignItems: "center",
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
                border: "1px solid #0077B6",
                padding: "2px 1px",
                textWrap: "wrap"
            },
        },
        pagination: {
            style: {
                marginTop: "1rem",
                backgroundColor: isDarkMode ? "gray" : "white",
                color: isDarkMode ? "white" : "black",
            },
        }
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div>
            <Heading title="Payment History"></Heading>
            <div className="form-control w-full sm:w-3/4 xl:w-2/3 mx-auto my-4 min-[400px]:my-6 sm:my-8 md:my-10 relative">
                <input
                    defaultValue={search}
                    ref={searchRef}
                    type="text"
                    placeholder="Search by Camp Name/Location/Doctor/Payment Date-Time/Transaction ID"
                    className="input input-bordered h-12 w-full bg-white dark:bg-black text-black dark:text-white sm:text-sm lg:text-base"
                />
                <button
                    onClick={() => setSearch(searchRef.current.value)}
                    className="absolute h-12 w-12 rounded-r-xl flex justify-center items-center bg-gray-200 text-black right-0 top-0">
                    <FaSearch />
                </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                <DataTable
                    columns={columns}
                    data={paymentHistory}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                    pagination
                />
            </div>
        </div>
    );
};

export default PaymentHistory;