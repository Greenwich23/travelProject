import { FaStar, FaTrash, FaSearch} from "react-icons/fa";
import "./Favorites.css";
import { CiLocationOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
export default function Favorites({ favorites, setFavorites }) {
  const [filteredSearch, setFilteredSearch] = useState("");
  const now = new Date();
  let filtered = favorites || []
  const filteredSearchResults = useMemo(() => {
    if (filteredSearch && filteredSearch !== "") {
      filtered = filtered.filter(
        (favorites) =>
          favorites.name
            .toLowerCase()
            .includes(filteredSearch.toLowerCase()) ||
          favorites.country
            .toLowerCase()
            .includes(filteredSearch.toLowerCase())
      );
      console.log(filteredSearch);
    }
    return filtered
  }, [filteredSearch, favorites]);

  return (
    <div className="favoritesPage">
      <div className="favoritesDiv">
        <h2 className="Favoritesh3">Your Favorite Destinations</h2>
        <p style={{ textAlign: "center" }}>
          {filteredSearchResults.length} destination saved for your next adventure
        </p>
        <div className="favoriteSearchDiv" tabindex="0">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            className="favoriteInput"
            placeholder="Search Your Favorites..."
            onChange={(e) => setFilteredSearch(e.target.value)}
            value={filteredSearch}
          />
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="noFavoritesDiv">
          <img
            src="https://images.unsplash.com/photo-1631823794808-b359f1132de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGZhdm9yaXRlcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NTczNTUwNjJ8MA&ixlib=rb-4.1.0&q=80&w=600"
            alt=""
          />
          <h2>No favorites yet --- start exploring!</h2>
          <p>
            Save destinations you love by clicking the heart icon. Your
            favorites will appear here so you can easily plan your next
            adventure.
          </p>
          <NavLink to={"/discover"} className="startExploring">
            Start Exploring
          </NavLink>
        </div>
      ) : (
        <div className="favoritesGrid">
          {filteredSearchResults?.map((item) => {
            return (
              <div key={item.id} className="favoriteCard">
                <img
                  src={item.image}
                  alt={item.name}
                  className="favoriteCardImg"
                />
                <div className="favoritesTextDiv">
                  <div className="favoritesTextNameDiv">
                    <p className="favoritesTextName">{item.name}</p>
                    <p>
                      <FaStar style={{ color: "yellow" }} /> {item.rating}
                    </p>
                  </div>
                  <div className="favoritesTextCountry">
                    <CiLocationOn />
                    <p>{item.country}</p>
                    <p>({item.reviews})</p>
                  </div>
                  <p>{item.description}</p>
                  <p> Saved: {now.toLocaleDateString()}</p>
                  <div className="favoritesTrashDiv">
                    <NavLink
                      className="viewDetails"
                      to={`/discover/${item.id}`}
                    >
                      View Details
                    </NavLink>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setFavorites(
                          favorites?.filter((fav) => fav.id !== item.id)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
