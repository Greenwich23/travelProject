import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
function fetchDestinations() {
  return axios.get("/destinations.json");
}
export const useDestinationsData = (onError, onSuccess) => {
  // setstate(true)
  return useQuery({
    queryKey : ['destinations'],
    queryFn : () => fetchDestinations(),
    onError,
    onSuccess,
    refetchOnMount : true,
    refetchOnWindowFocus : true
  } )
};

// const {data} = useQuery('', )