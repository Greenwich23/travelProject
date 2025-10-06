import "./HomePage.css";
import axios from "axios";
import { useDestinationsData } from "../hooks/useDestinations";
import { NavLink } from "react-router-dom";
import {
  FaStar,
  FaRegHeart,
  FaSearch,
  FaUtensils,
  FaEye,
  FaCalendar,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuWaves, LuMountainSnow } from "react-icons/lu";
import { useMoodDestinationsData } from "../hooks/useMoodDestinations";
import { useFetchGalleryImagesData } from "../hooks/useTravelGallery";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { Helmet } from "react-helmet";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import { useBaseQuery } from "../hooks/useBaseQuery";

const icons = {
  LuWaves: LuWaves,
  LuMountainSnow: LuMountainSnow,
  CiLocationOn: CiLocationOn,
  FaUtensils: FaUtensils,
};

export default function Homepage() {
  const [searchSuggest, setSearchSuggest] = useState("");
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { data } = useDestinationsData(onError, onSuccess);
  const { data: moodData } = useMoodDestinationsData(onError, onSuccess);
  const { data: travelGalleryData } = useFetchGalleryImagesData(
    onError,
    onSuccess
  );

  const {} = useBaseQuery({
    queryUrl: "/articles.json",
    queryKey: ["articles"],
  });

  console.log(data);
  console.log(travelGalleryData);

  return (
    <div id="home">
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={`https://res.cloudinary.com/dsqax0vc0/image/fetch/f_auto,q_auto/https://images.unsplash.com/photo-1685271555713-f9bf8d6c3721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwb2NlYW4lMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MzU0ODk0fDA&ixlib=rb-4.1.0&q=80&w=1080`}
        />
      </Helmet>

      <section className="sectionContainer">
        <div className="sectionDiv">
          <h2 className="sectionText">
            {" "}
            <ReactTyped
              strings={["Discover the world with 🌍"]}
              typeSpeed={60} // speed of typing
              backSpeed={30} // speed of deleting
              showCursor={false}
            />
          </h2>
          <h2 className="sectionTextVoyago">Voyago</h2>
          <p className="sectionParagraph">
            Find your perfect destination and create unforgettable memories.
            From hidden gems to iconic landmarks, your next adventure awaits
          </p>
          <div className="searchForm">
            <div className="searchFormFlex">
              <div className="searchFormMap" tabindex="0">
                <CiLocationOn style={{ color: "grey" }} />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchSuggest}
                  onChange={(e) => setSearchSuggest(e.target.value)}
                />
              </div>
              <button className="searchButton">
                <FaSearch />
                Search
              </button>
            </div>
            <div className="searchSuggestDiv">
              <button
                className="searchSuggest"
                onClick={() => setSearchSuggest("Bali")}
              >
                Bali
              </button>
              <button
                className="searchSuggest"
                onClick={() => setSearchSuggest("Paris")}
              >
                Paris
              </button>
              <button
                className="searchSuggest"
                onClick={() => setSearchSuggest("Tokyo")}
              >
                Tokyo
              </button>
              <button
                className="searchSuggest"
                onClick={() => setSearchSuggest("Morocco")}
              >
                Morocco
              </button>
              <button
                className="searchSuggest"
                onClick={() => setSearchSuggest("Iceland")}
              >
                Iceland
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="popularDestination">
        <h2>Popular Destinations</h2>
        <p className="popularDestinationp">
          Discover the world's most beloved travel destinations, curated by our
          community of explorers.
        </p>
        <div class="cardsContainer" id="cardsContainer">
          {data?.data.slice(0, 4).map((destination) => {
            return (
              <figure className="card">
                <img
                  src={destination.image}
                  alt=""
                  className="locationImg"
                  loading="lazy"
                />
                <FaRegHeart id="favoriteBtn" />
                <div className="cardTextDiv">
                  <div className="cardTextSubDiv">
                    <div className="cardTextFlex">
                      <p>{destination.name}</p>
                      <p>
                        <FaStar style={{ color: "yellow" }} />{" "}
                        {destination.rating}
                      </p>
                    </div>
                    <div className="cardTextFlex2">
                      <p className="country">
                        <CiLocationOn className="location" />{" "}
                        {destination.country}
                      </p>
                      <p className="reviews">({destination.reviews} reviews)</p>
                    </div>
                    <div className="cardDescription">
                      <p className="description">{destination.description}</p>
                    </div>
                    <div className="cardTagFlex">
                      <p className="tags">{destination.category[0]}</p>
                      <p className="tags">{destination.category[1]}</p>
                    </div>
                    <div className="discoverDiv">
                      <NavLink
                        id="discover"
                        className="discover"
                        to={`/discover/${destination.id}`}
                      >
                        Discover
                      </NavLink>
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
        <div class="allDestination">
          <NavLink to={"/discover"}>View all Destinations</NavLink>
        </div>
      </section>
      <section class="travelMoodSection">
        <h2>Travel by mood</h2>
        <p>
          Find your perfect trip based on how you're feeling and what
          experiences you're seeking.
        </p>
        <div className="moodCardsContainer" id="moodCardContainer">
          {moodData?.data.map((moodDestination) => {
            const IconComponent = icons[moodDestination.icon];
            return (
              <figure className="moodCards">
                <div
                  className="moodCardIcon"
                  style={{ background: moodDestination.gradient }}
                >
                  <IconComponent className="moodIcon" />
                </div>
                <div className="moodCardText">
                  <h3 className="moodText">{moodDestination.title}</h3>
                  <p>{moodDestination.description}</p>
                  <div className="moodFlex">
                    <p>{moodDestination.destinations} destinations</p>
                    <div className="moodCircle">
                      <div className="moodCircle2"></div>
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
      <section className="imageGallery">
        <h3>Inspiration Gallery</h3>
        <p className="imageGalleryp">
          Get inspired by breathtaking travel photography from our community of
          explorers around the world.
        </p>
        <div className="imagesContainer">
          {travelGalleryData?.data.slice(0, 6).map((images) => {
            return (
              <figure className="images">
                {/* <p>sdsd</p> */}
                <FaRegHeart className="imageHeart" />
                <img
                  src={`https://res.cloudinary.com/dsqax0vc0/image/fetch/f_auto,q_auto/${images.src}`}
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
        <NavLink to={"/imageGallery"} className="viewMorePhotos">
          {" "}
          View more photos
        </NavLink>
      </section>
      <section className="articleSection">
        <h6>Travel Stories & Tips</h6>
        <p className="articleAbout">
          Get inspired by real travel experiences and practical advice from
          fellow explorers and travel experts.
        </p>
        <div className="articleContainer">
          <div className="articleLarge">
            <p className="articleTag">Adventure</p>
            <img
              src="https://images.unsplash.com/photo-1566721328889-7c554f483ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2luZyUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NTczNTUwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt=""
              className="articleLargeImage"
              loading="lazy"
            />
            <div className="articleLargeText">
              <a
                className="articleLink"
                href="https://www.thebrokebackpacker.com/backpacking-southeast-asia-travel-guide/"
              >
                The Ultimate Guide to Solo Backpacking Through Southeast Asia
              </a>
              <p>
                Everything you need to know about traveling solo through
                Thailand, Vietnam, Cambodia, and Laos. From budget tips to
                safety advice.
              </p>
              <div className="articleFlexTags">
                <p>Solo Travel</p>
                <p>Backpacking</p>
                <p>Southeast Asia</p>
              </div>
              <div className="articleInformation">
                <div className="articleDetails">
                  <div className="articleAuthorDetails">
                    <CgProfile />
                    <p>Sarah Chen</p>
                  </div>
                  <div className="articleAuthorDetails">
                    <FaCalendar />
                    <p>Mar 15, 2024</p>
                  </div>
                  <div className="articleAuthorDetails">
                    <FaClock />
                    <p>12 min read</p>
                  </div>
                </div>
                <div className="readMoreDiv">
                  <NavLink to="/articles" className="readMore">
                    Read More
                  </NavLink>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
          <div className="articlesSubDiv">
            <div className="articles">
              <img
                src="https://images.unsplash.com/photo-1666866673594-52cdd385e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZvb2QlMjBtYXJrZXQlMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MzU1MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt=""
                className="articleSubDivImage"
                loading="lazy"
              />
              <div className="articlesSubText">
                <p className="articleSubTextTag">Food & Culture</p>
                <a
                  className="articleSubTextTitle"
                  href="https://npexpeditions.com/moroccan-culinary-treasures/"
                >
                  Hidden Food Markets: A Culinary Journey Through...
                </a>
                <span>
                  Discover the secret food markets of Marrakech and Fez, where
                  locals go
                </span>
                <div className="articlesSubDivFlex">
                  <p>Ahmed Musa</p>
                  <p>Mar 10, 2024 • 8 min</p>
                </div>
              </div>
            </div>
            <div className="articles">
              <img
                src="https://images.unsplash.com/photo-1618393678187-fb258b8ee191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBqb3VybmFsJTIwd3JpdGluZ3xlbnwxfHx8fDE3NTczNTUwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt=""
                className="articleSubDivImage"
                loading="lazy"
              />
              <div className="articlesSubText">
                <p className="articleSubTextTag">Digital Nomad</p>
                <a
                  className="articleSubTextTitle"
                  href="https://horizondwellers.com/the-ultimate-guide-to-digital-nomad-remote-work-travel/"
                >
                  Digital Nomad Essentials: Working Remotely from Paradise
                </a>
                <span>
                  The complete guide to becoming a digital nomad, including the
                  best destinations, tools, and tips for maintaining
                  productivity while traveling.
                </span>
                <div className="articlesSubDivFlex">
                  <p>Marcus Rodriguez</p>
                  <p>2024-03-05 • 15 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavLink className="viewMoreArticles" to={"/articles"}>
          View More Articles
        </NavLink>
      </section>
    </div>
  );
}
