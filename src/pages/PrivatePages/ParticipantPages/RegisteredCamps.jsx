import Heading from "../../../components/shared/Heading";
import DataTable from "react-data-table-component";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const RegisteredCamps = () => {

    const { user, isDarkMode } = useAuth();
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const axiosSecure = useAxiosSecure();

    const { data: userRegisteredCamps = [], isPending, refetch } = useQuery({
        queryKey: ['userRegisteredCamps', search],
        queryFn: async () => {
            const res = await axiosSecure(`/user-registered-camps/${user.email}?search=${search}`);
            return res.data;
        }
    })

    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure you want to cancel this registration?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel!",
            cancelButtonText: "No, go back!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/cancel-registration/${id}`);
                if (data.deletedCount > 0) {
                    toast.info('Registration Canceled!', {
                        position: "top-center",
                        autoClose: 1000
                    })
                }
                refetch();
            }
        });
    }

    const columns = [
        {
            name: "Camp Name",
            selector: (row) => row.campName,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center font-semibold text-sm p-2">{row.campName}</p>),
            minWidth: "140px",
            maxWidth: "320px",
        },
        {
            name: "Location",
            selector: (row) => row.location,
            cell: (row) => <span className="w-max mx-auto text-center text-sm">{row.location}</span>,
            sortable: true,
            minWidth: "120px",
            maxWidth: "270px",
        },
        {
            name: "Your Name",
            selector: (row) => row.participant_Name,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center font-semibold text-sm p-2">{row.participant_Name}</p>),
            minWidth: "120px",
            maxWidth: "200px",
        },
        {
            name: "Camp Fees",
            selector: (row) => row.fee,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center text-sm">{row.fee}</p>),
            minWidth: "120px",
            maxWidth: "150px"
        },
        {
            name: "Payment Status",
            selector: (row) => row.paymentStatus,
            sortable: true,
            cell: (row) => (
                <div className={`w-max mx-auto flex justify-center items-center ${row.paymentStatus === 'Unpaid' && 'gap-2'}`}>
                    <p className={`text-center text-sm ${row.paymentStatus==='Paid' && 'bg-green-500 text-white px-2 py-1'}`}>
                        {row.paymentStatus}
                    </p>
                    {
                        row.paymentStatus === 'Unpaid' ?
                            <Link to={`/dashboard/payment/${row._id}`} className="w-max flex justify-center items-center bg-green-500 px-1 shadow-md text-white hover:scale-105">
                                <span>Pay</span>
                                <RxArrowTopRight />
                            </Link> :
                            <></>
                    }
                </div>
            ),
            minWidth: "120px",
            maxWidth: "200px"
        },
        {
            name: <div className="flex flex-col items-center">
                <p className="text-center">Confirmation</p>
                <p className="text-center text-xs">(click to confirm)</p>
            </div>,
            selector: (row) => row.confirmationStatus,
            cell: (row) => (
                <p className={`text-sm text-white font-semibold w-max mx-auto px-2 py-1 ${row.confirmationStatus === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {row.confirmationStatus}
                </p>
            ),
            sortable: true,
            minWidth: "120px",
            maxWidth: "170px"
        },
        {
            name: "Action",
            selector: (row) => row.fee,
            sortable: false,
            cell: (row) => (
                <div className="w-max mx-auto flex flex-col justify-center items-center">
                    {
                        row.paymentStatus === "Paid" ?
                            <button className="w-max py-1 px-2 rounded-lg bg-primary text-white hover:scale-105">Feedback</button> :
                            <button onClick={() => handleCancel(row._id)} className="w-max py-1 px-2 rounded-lg bg-red-500 text-white hover:scale-105">Cancel</button>
                    }
                </div>
            ),
            minWidth: "100px",
            maxWidth: "120px"
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

    if (isPending) return <Loading></Loading>;

    return (
        <div>
            <Heading title="Manage Your Registrations"></Heading>
            <div className="form-control w-full sm:w-3/4 xl:w-2/3 mx-auto my-4 min-[400px]:my-6 sm:my-8 md:my-10 relative">
                <input
                    defaultValue={search}
                    ref={searchRef}
                    type="text"
                    placeholder="Search by Camp Name, Location, Payment status or Confirmation status"
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
                    data={userRegisteredCamps}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                    pagination
                />
            </div>
        </div>
    );
};

export default RegisteredCamps;