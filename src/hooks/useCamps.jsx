import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../utilities/utilities";


const useCamps = (limit='', search='') => {

    const { data: camps = [], isPending, refetch} = useQuery({
        queryKey: ['camps', limit, search],
        queryFn: async () => {
            const res = await axiosPublic(`/camps?limit=${limit}&search=${search}`);
            return res.data;
        }
    })
    return {camps, isPending, refetch};
};

export default useCamps;