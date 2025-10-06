import {
  FaFilter,
  FaSearch,
  FaRegHeart,
  FaEye,
  FaChevronDown,
} from "react-icons/fa";
import "./imageGallery.css";
import { useFetchGalleryImagesData } from "../hooks/useTravelGallery";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect, useMemo } from "react";

const options = [
  "All Photos",
  "Nature",
  "Cities",
  "Beaches",
  "Cultural",
  "Desert",
  "Coastal",
  "Aurora",
  "Wildlife"
];
const sortFields = ["Popular", "Recent", "Most Liked"];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("imageSelectedCategory") || "All Photos";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || "Recent";
  });
  const [filteredSearch, setFilteredSearch] = useState(() => {
    return localStorage.getItem("searchedFilter") || "";
  });

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error ", error);
  };
  const { data: travelGalleryData } = useFetchGalleryImagesData(
    onError,
    onSuccess
  );
  console.log(travelGalleryData);
  useEffect(() => {
    localStorage.setItem("imageSelectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("searchedFilter", filteredSearch);
  }, [filteredSearch]);

  const filteredAndSortedPhotos = useMemo(() => {
    let filtered = travelGalleryData?.data || [];
    if (selectedCategory && selectedCategory !== "All Photos") {
      filtered = filtered.filter(
        (photo) => photo.category === selectedCategory
      );
      console.log("others");
    }
    if (filteredSearch && filteredSearch !== "") {
      filtered = filtered.filter((photo) =>
        photo.location.toLowerCase().includes(filteredSearch.toLowerCase())
      );
      console.log(filteredSearch);
    }
    if (sortBy === "Popular") {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (sortBy === "Most Liked") {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "Recent") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    return filtered;
  }, [travelGalleryData, selectedCategory, sortBy, filteredSearch]);

  return (
    <div className="imageGalleryPage" id="home">
      <section className="imageGallery">
        <h3>Travel Gallery</h3>
        <p className="imageGalleryp">
          Discover breathtaking travel photography from around the world. Get
          inspired for your next adventure.
        </p>
        <div className="filtersSearchDiv">
          <div className="filtersFlex">
            <div className="filterSearch">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by location or tag..."
                className=""
                value={filteredSearch}
                onChange={(e) => setFilteredSearch(e.target.value)}
              />
            </div>
            <div className="filters">
              <FaFilter className="filtersIcon"/>
              <Menu as="div" className="dropDownDiv">
                <MenuButton as="div" className="menuButton">
                  <p>{selectedCategory}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems anchor="bottom" as="div" className="filterDropDown">
                  {options.map((option) => (
                    <MenuItem
                      as="p"
                      key={option}
                      className="options"
                      onClick={() => setSelectedCategory(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <Menu as="div" className="dropDownDiv">
                <MenuButton as="div" className="menuButton">
                  <p>{sortBy}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems anchor="bottom" as="div" className="filterDropDown">
                  {sortFields.map((sortItems) => (
                    <MenuItem
                      as="p"
                      key={sortItems}
                      className="options"
                      onClick={() => setSortBy(sortItems)}
                    >
                      {sortItems}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div>
            <p>
              Showing {filteredAndSortedPhotos.length} photos of {" "}
              {travelGalleryData?.data.length} photos
            </p>
          </div>
        </div>
        <div className="imagesContainer">
          {filteredAndSortedPhotos.map((images) => {
            return (
              <figure className="images">
                {/* <p>sdsd</p> */}
                <img
                  src={`https://res.cloudinary.com/dsqax0vc0/image/fetch/f_auto,q_auto/${images.src}`}
                  srcSet={`${images.src}&w=300 300w,   // For small screens
                  ${images.src}&w=600 600w,   // For standard displays
                  ${images.src}&w=900 900w    // For high-DPI displays or zooms`}
                  alt=""
                  loading="lazy"
                />
                <div className="imagesText">
                  <h4>{images.location}</h4>
                  <p>By {images.photographer}</p>
                  <div className="imagesTextFlex">
                    <div>
                      <FaRegHeart />
                      <p>{images.likes}</p>
                    </div>
                    <div>
                      <FaEye />
                      <p>{images.views}</p>
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}




