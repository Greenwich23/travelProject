import {
  FaSearch,
  FaChevronDown,
  FaRegHeart,
  FaTemperatureHigh,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import "./Discover.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useDestinationsData } from "../hooks/useDestinations";
import { useState, useEffect, useMemo } from "react";

const regions = [
  "All Regions",
  "Europe",
  "Asia",
  "Africa",
  "Oceania",
  "North America",
  "South America",
];
const categories = [
  "All Categories",
  "Beach",
  "Culture",
  "Nature",
  "Luxury",
  "Adventure",
  "Wildlife",
  "City Life",
  "Party",
  "History",
];
const sortFields = ["Most Popular", "Highest Rated", "Name A-Z"];

export default function Discover({ favorites, setFavorites }) {
  const [selectedRegion, setSelectedRegion] = useState(() => {
    return localStorage.getItem("selectedRegion") || "All Regions";
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("discoverSelectedCategory") || "All Categories";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("destinationSortBy") || "Most popular";
  });
  const [filteredSearch, setFilteredSearch] = useState(() => {
    return localStorage.getItem("destinationSearchedFilter") || "";
  });

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error ", error);
  };

  const { data: destinationData } = useDestinationsData(onError, onSuccess);
  console.log(destinationData);

  useEffect(() => {
    localStorage.setItem("selectedRegion", selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    localStorage.setItem("discoverSelectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("destinationSortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("destinationSearchedFilter", filteredSearch);
  }, [filteredSearch]);

  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = destinationData?.data || [];
    if (selectedRegion && selectedRegion !== "All Regions") {
      filtered = filtered.filter(
        (destination) => destination.region === selectedRegion
      );
      console.log("others");
      console.log(selectedRegion);
    }
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((destination) =>
        destination.category.includes(selectedCategory)
      );
    }

    if (filteredSearch && filteredSearch !== "") {
      filtered = filtered.filter(
        (destination) =>
          destination.name
            .toLowerCase()
            .includes(filteredSearch.toLowerCase()) ||
          destination.country
            .toLowerCase()
            .includes(filteredSearch.toLowerCase())
      );
      console.log(filteredSearch);
    }
    if (sortBy === "Most Popular") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.reviews) - new Date(a.reviews)
      );
    } else if (sortBy === "Name A-Z") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Highest Rated") {
      filtered = [...filtered].sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  }, [
    destinationData,
    selectedCategory,
    sortBy,
    filteredSearch,
    selectedRegion,
  ]);
  console.log(filteredAndSortedDestinations);

  return (
    <div className="discoverPage" id="home">
      <div className="discoverContainer">
        <div className="discoverTextHolder">
          <h3>Discover Amazing Destinations</h3>
          <p>
            Explore the world's most beautiful places with real-time information
          </p>
          <div className="discoverSearchDiv" tabindex="0">
            <FaSearch className="searchIcon" />
            <input
              type="text"
              className="discoverInput"
              placeholder="Search Destinations or Countries..."
              onChange={(e) => setFilteredSearch(e.target.value)}
              value={filteredSearch}
            />
          </div>
        </div>
      </div>
      <section className="discoverLocationContainer">
        <div className="discoverLocationDiv">
          <div className="discoverFilterDiv">
            <div className="discoverFilters">
              <Menu as="div" className="discoverDropDownDiv">
                <MenuButton as="div" className="discoverMenuButton">
                  <p>{selectedRegion}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems
                  anchor="bottom"
                  as="div"
                  className="discoverFilterDropDown"
                >
                  {regions.map((region) => (
                    <MenuItem
                      as="p"
                      key={region}
                      className="discoverOptions"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <Menu as="div" className="discoverDropDownDiv">
                <MenuButton as="div" className="discoverMenuButton">
                  <p>{selectedCategory}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems
                  anchor="bottom"
                  as="div"
                  className="discoverFilterDropDown"
                >
                  {categories.map((category) => (
                    <MenuItem
                      as="p"
                      key={category}
                      className="discoverOptions"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <Menu as="div" className="discoverDropDownDiv">
                <MenuButton as="div" className="discoverMenuButton">
                  <p>{sortBy}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems
                  anchor="bottom"
                  as="div"
                  className="discoverFilterDropDown"
                >
                  {sortFields.map((sortItems) => (
                    <MenuItem
                      as="p"
                      key={sortItems}
                      className="discoverOptions"
                      onClick={() => setSortBy(sortItems)}
                    >
                      {sortItems}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <p className="discoverDestinationp">
              {filteredAndSortedDestinations.length} destinations Found
            </p>
          </div>
        </div>
        <div className="discoverLocationSubDiv">
          {filteredAndSortedDestinations.map((destination) => {
            const isFavorite = favorites.some(
              (fav) => fav.id === destination.id
            );

            const toggleFavorite = (e) => {
              e.preventDefault(); // prevent NavLink from triggering when clicking heart
              if (isFavorite) {
                setFavorites(
                  favorites.filter((fav) => fav.id !== destination.id)
                );
              } else {
                setFavorites([...favorites, destination]);
              }
            };
            return (
              <NavLink
                className="discoverLocationFigure"
                to={`/discover/${destination.id}`}
              >
                <img
                  src={destination.image}
                  alt=""
                  className="discoverLocationFigureImage"
                />
                {isFavorite ? (
                  <FaHeart
                    className="discoverHeartIcon"
                    style={{ color: "crimson" }}
                    onClick={toggleFavorite}
                  />
                ) : (
                  <FaRegHeart
                    className="discoverHeartIcon"
                    style={{ color: "gray" }}
                    onClick={toggleFavorite}
                  />
                )}
                <div className="discoverLocationText">
                  <h2 className="discoverLocationFigureh2">
                    {destination.name}
                  </h2>
                  <div className="discoverLocationCountry">
                    <CiLocationOn />
                    <p>{destination.country}</p>
                  </div>
                  <div className="discoverTemp">
                    <p>
                      <FaTemperatureHigh /> {destination.weather.temperature}
                    </p>
                    &bull;
                    <p>
                      <FaClock /> {destination.timezone}
                    </p>
                  </div>
                  <p>{destination.weather.condition}</p>
                  <div className="discoverLocationCatgeoryDiv">
                    <p className="discoverLocationCategory">
                      {destination.category[0]}
                    </p>
                    <p className="discoverLocationCategory">
                      {destination.category[1]}
                    </p>
                    <p className="discoverLocationCategory">
                      {destination.category[2]}
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </div>
  );
}
