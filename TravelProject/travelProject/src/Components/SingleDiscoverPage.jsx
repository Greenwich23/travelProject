import { NavLink, useParams } from "react-router-dom";
import useSingleDiscoverData from "../hooks/useSingleDiscoverData";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCamera,
  FaCar,
  FaClock,
  FaHeart,
  FaHotel,
  FaMoneyBill,
  FaRegHeart,
  FaStar,
  FaTemperatureHigh,
  FaTruck,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import "./SingleDiscoverPage.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { GiFamilyHouse, GiOppidum } from "react-icons/gi";

export default function SingleDiscover() {
  const { heroId } = useParams();
  const {
    data: discoverData,
    isError,
    isLoading,
  } = useSingleDiscoverData(heroId);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(
    Number(localStorage.getItem("currentGalleryIndex")) || 0 
  );
  const [favorites, setFavorites] = useState(false);

  const nextImage = () => {
    setCurrentGalleryIndex((prev) =>
      prev === discoverData.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentGalleryIndex((prev) =>
      prev === 0 ? discoverData.gallery.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    localStorage.setItem("currentGalleryIndex", currentGalleryIndex);
  }, [currentGalleryIndex]);

  console.log(discoverData);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div style={{ color: "black" }} id="home">
      <div className="backToDestinationDiv">
        <FaArrowLeft />
        <NavLink className="backToDestination" to={"/discover"}>
          Back to Destination
        </NavLink>
      </div>
      <div className="singleDiscoverLocationDiv">
        <div className="singleDiscoverImageAndText">
          <img
            className="singleDiscoverMainImage"
            src={discoverData.image}
            srcSet={`${discoverData.image}&w=300 300w,   // For small screens
                  ${discoverData.image}&w=600 600w,   // For standard displays
                  ${discoverData.image}&w=900 900w    // For high-DPI displays or zooms`}
          />
          <div className="singleDiscoverCountryDetails">
            <h2>{discoverData.name}</h2>
            <div className="singleDiscoverLocationFlex">
              <CiLocationOn />
              <p>
                {discoverData.country}, {discoverData.location.region}
              </p>
            </div>
            <p className="singleDiscoverLocationP">
              <FaStar /> {discoverData.rating} ({discoverData.reviews} reviews)
            </p>
          </div>
        </div>

        <div className="singleDiscoverAboutText">
          <h2>About {discoverData.name}</h2>
          <p>{discoverData.description}</p>
        </div>
      </div>
      <div className="singleDiscoverDataDiv">
        <div className="singleDiscoverDataDiv2">
          <div className="singleDiscoverData1">
            <div className="singleDiscoverDataCard1Info">
              <h2>Key Information</h2>
              <div className="singleDiscoverDataFlexDiv">
                <div className="singleDiscoverDataFlex">
                  <FaTemperatureHigh className="singleDiscoverDataFlexIcons" />
                  <div>
                    <h3>Weather</h3>
                    <p>
                      {discoverData.weather.temperature}{" "}
                      {discoverData.weather.condition}{" "}
                    </p>
                  </div>
                  <FaClock className="singleDiscoverDataFlexIcons" />
                  <div>
                    <h3 style={{textAlign: "center"}}>Time zone</h3>
                    <p>{discoverData.timezone}</p>
                  </div>
                  <CiLocationOn className="singleDiscoverDataFlexIcons" />
                  <div>
                    <h3 style={{textAlign: "center"}}>Location</h3>
                    <p>{discoverData.location.coordinates}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="singleDiscoverDataCard1">
              <h2>Things to do</h2>
              <div className="singleDiscoverThingsToDoDiv">
                {discoverData.thingsToDo.map((toDo) => {
                  return (
                    <div className="singleDiscoverThingsToDo">
                      <FaCamera className="singleDiscoverThingsToDoIcon" />
                      <p>{toDo}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="singleDiscoverDataCard1">
              <h2>Photo Gallery</h2>
              {/* Map ALL gallery images here */}

              <div className="singleDataImageDiv">
                <FaArrowLeft className="faArrowLeft" onClick={prevImage} />
                <FaArrowRight className="faArrowRight" onClick={nextImage} />
                <img
                  src={discoverData.gallery[currentGalleryIndex]}
                  className="singleDiscoverImage"
                />
              </div>
              <div className="singleDiscoverGalleryDiv">
                {discoverData.gallery.map((img, index) => (
                  <img
                    src={img}
                    alt={"example"}
                    className={
                      index == currentGalleryIndex
                        ? "singleDiscoverGalleryActive"
                        : "singleDiscoverGallery"
                    }
                    onError={(e) => (e.currentTarget.src = "/fallback.png")}
                    onClick={() => setCurrentGalleryIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="singleDiscoverData2">
            <div className="singleDiscoverDataCard1">
              <h2 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FaMoneyBill /> Budget Range{" "}
              </h2>
              <div className="budgetDiv">
                <h3>{discoverData.budget.range}</h3>
                <p>{discoverData.budget.details}</p>
              </div>
            </div>
            <div className="singleDiscoverDataCard1">
              <h2 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FaTruck /> Transportation{" "}
              </h2>
              <div className="singleDiscoverTransportationDiv">
                {discoverData.transportation.map((transport) => {
                  return (
                    <div className="singleDiscoverTransportation">
                      <FaCar className="singleDiscoverThingsToDoIcon" />
                      <p>{transport}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="singleDiscoverDataCard1">
              <h2 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <FaHotel /> Where to stay{" "}
              </h2>
              <div className="singleDiscoverAccomodationDiv">
                {discoverData.accommodation.map((transport) => {
                  return (
                    <div className="singleDiscoverAccomodation">
                      <GiFamilyHouse className="singleDiscoverThingsToDoIcon" />
                      <p>{transport}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
