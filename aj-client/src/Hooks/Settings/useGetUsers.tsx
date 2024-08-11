import GetUsers from "@/Api/Settings/GetUsers.api";
import { useQuery } from "react-query";
const useGetUsers = () => {
    return useQuery({
        queryKey: ["Users" ],
        queryFn:GetUsers,
      refetchOnWindowFocus: false,
      refetchOnMount:true,
      staleTime: 1000 * 60 , // 5 minutes
    });
};

export default useGetUsers;
