import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../utilities/utilities";


const useCamps = () => {

    const {data:camps = [], isPending, refetch} = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/camps');
            return data;
        }
    })
    return {camps, isPending, refetch};
};

export default useCamps;