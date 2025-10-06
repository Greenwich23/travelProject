import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
function fetchMoodDestinations() {
  return axios.get("/moodDestinations.json");
}
export const useMoodDestinationsData = (onError, onSuccess) => {
  // setstate(true)
  return useQuery({
    queryKey : ['MoodDestinations'],
    queryFn : () => fetchMoodDestinations(),
    onError,
    onSuccess,
    refetchOnMount : true,
    refetchOnWindowFocus : true
  } )
};