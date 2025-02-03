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


const ManageRegisteredCamps = () => {

    const { isDarkMode } = useAuth();
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const axiosSecure = useAxiosSecure();

    const { data: registeredCamps = [], isPending, fetchStatus, refetch } = useQuery({
        queryKey: ['registeredCamps', search],
        queryFn: async () => {
            const res = await axiosSecure(`/registered-camps?search=${search}`);
            return res.data;
        }
    })

    const handleConfirm = async id => {
        const { data } = await axiosSecure.patch(`/registered-camps/${id}`);
        if (data.modifiedCount > 0) {
            refetch();
        }
    }

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
                const { data } = await axiosSecure.delete(`/delete-registration/${id}`);
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
            name: "Participant Name",
            selector: (row) => row.participant_Name,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center font-semibold text-sm p-2">{row.participant_Name}</p>),
            minWidth: "120px",
            maxWidth: "250px",
        },
        {
            name: "Camp Name",
            selector: (row) => row.campName,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center font-semibold text-sm p-2">{row.campName}</p>),
            minWidth: "140px",
            maxWidth: "320px",
        },
        {
            name: "Participant Email",
            selector: (row) => row.participant_Email,
            sortable: false,
            cell: (row) => <span className="w-max mx-auto text-center text-sm">{row.participant_Email}</span>,
            minWidth: "120px",
            maxWidth: "250px",
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
            cell: (row) => (<p className="w-max mx-auto text-center text-sm">{row.paymentStatus}</p>),
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
                <div className="w-max mx-auto">
                    {
                        fetchStatus === 'fetching' ?
                            <span className="loading loading-spinner loading-xs"></span> :
                            <button onClick={() => handleConfirm(row._id)} className={`text-sm text-white w-max px-2 rounded-xl ${row.confirmationStatus === 'Confirmed' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                {row.confirmationStatus}
                            </button>
                    }
                </div>
            ),
            sortable: true,
            minWidth: "120px",
            maxWidth: "170px"
        },
        {
            name: "Cancel Reg.",
            selector: (row) => row.fee,
            sortable: false,
            cell: (row) => (
                <div className="w-max mx-auto flex flex-col justify-center items-center">
                    <button
                        disabled={row.paymentStatus === 'Paid' && row.confirmationStatus === 'Confirmed'}
                        onClick={() => handleCancel(row._id)}
                        className="w-max py-1 px-2 rounded-lg bg-red-500 text-white hover:scale-105 disabled:bg-gray-600 disabled:text-gray-100 disabled:hover:cursor-not-allowed disabled:hover:scale-100">
                            cancel
                    </button>
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
            <Heading title="Manage All Existing Camps"></Heading>
            <div className="form-control w-full sm:w-3/4 xl:w-2/3 mx-auto my-4 min-[400px]:my-6 sm:my-8 md:my-10 relative">
                <input
                    defaultValue={search}
                    ref={searchRef}
                    type="text"
                    placeholder="Search by Camp Name, User Name, Payment status or Confirmation status"
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
                    data={registeredCamps}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                    pagination
                />
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;