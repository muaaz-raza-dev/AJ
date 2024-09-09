import getStdAccountInfo from "@/Api/Student exclusive/StudentAccountInfo";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function useFetchStudentAccountInfo() {
  const grno = useParams().student || "";
  return useQuery({
    queryKey: ["Account", grno],
    queryFn: () => getStdAccountInfo(grno),
    retry:1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
