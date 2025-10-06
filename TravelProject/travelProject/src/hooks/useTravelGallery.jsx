import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
function fetchGalleryImages() {
  return axios.get("/imageGallery.json");
}
export const useFetchGalleryImagesData = (onError, onSuccess) => {
  // setstate(true)
  return useQuery({
    queryKey : ['ImageGallery'],
    queryFn : () => fetchGalleryImages(),
    onError,
    onSuccess,
    refetchOnMount : true,
    refetchOnWindowFocus : true
  } )
};