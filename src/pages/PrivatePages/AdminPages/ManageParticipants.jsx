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

const ManageParticipants = () => {

    const { isDarkMode } = useAuth();
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isPending, fetchStatus, refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure(`/users?search=${search}`);
            return res.data;
        }
    })

    const handleDeleteUser = id => {
        Swal.fire({
            title: "Are you sure you want to delete this User?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/delete-user/${id}`);
                if (data.deletedCount > 0) {
                    toast.success('User deleted successfully!', {
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
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
                <div className="flex justify-start items-center gap-3 text-start font-semibold text-base p-2">
                    <img src={row.image} alt="User_Image" className="w-12 h-12 rounded" />
                    <span>{row.name}</span>
                </div>
            ),
            minWidth: "245px",
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => <p className="w-max mx-auto text-center text-sm">{row.email}</p>,
            minWidth: "130px",
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
            cell: (row) => (<p className="w-max mx-auto text-center text-sm">{row.role}</p>),
            minWidth: "60px",
        },
        {
            name: "Action",
            selector: (row) => row.role,
            sortable: false,
            cell: (row) => (
                <div className="w-max mx-auto flex flex-col justify-center items-center gap-2">
                    <button className="w-max py-1 px-2 rounded-lg bg-primary text-white hover:scale-105">Send Email</button>
                    <button onClick={() => handleDeleteUser(row._id)} className="w-max py-1 px-2 rounded-lg bg-red-500 text-black hover:scale-105">Delete</button>
                </div>
            ),
            minWidth: "100px",
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
                    placeholder="Search by Name or Email"
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
                    data={users}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                    pagination
                />
            </div>
        </div>
    );
};

export default ManageParticipants;