import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchSingleData() {
  return axios.get("/destinations.json");
}

export default function useSingleDiscoverData(heroId) {
  return useQuery({
    queryKey: ["SingleDestinations", heroId],
    queryFn: async () => {
      const { data } = await fetchSingleData();
      return data.find((d) => d.id.toString() === heroId); // filter here
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
