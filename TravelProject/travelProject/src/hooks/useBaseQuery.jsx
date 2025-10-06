import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
function fetchArticlesData() {
  return axios.get("/articles.json");
}

export const useBaseQuery = ({ queryKey, queryUrl }) => {
  // setstate(true)
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(queryUrl);
      return response;
    },
  });
};
