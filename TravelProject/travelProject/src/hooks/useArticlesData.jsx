import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
function fetchArticlesData() {
  return axios.get("/articles.json");
}
export const useArticlesData = (onError, onSuccess) => {
  // setstate(true)
  return useQuery({
    queryKey : ['ArticlesData'],
    queryFn : () => fetchArticlesData(),
    onError,
    onSuccess,
    refetchOnMount : true,
    refetchOnWindowFocus : true
  } )
};