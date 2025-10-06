import { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SharedLayout from "./SharedLayout";
const HomePage = lazy(() => import("./Components/HomePage"));
const ImageGallery = lazy(() => import("./Components/ImageGallery"));
const Favorites = lazy(() => import("./Components/Favorites"));
const About = lazy(() => import("./Components/About"));
const Articles = lazy(() => import("./Components/Articles"));
const Discover = lazy(() => import("./Components/Discover"));
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SingleDiscover from "./Components/SingleDiscoverPage";
import ScrollToTop from "./Components/ScrollToTop";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {
  const queryClient = new QueryClient();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function ScrollToTopFunc() {
    window.scrollTo(0, 0);
  }

  function deleteFromFavorite() {
    
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        {visible && (
          <FaArrowCircleUp className="arrowUp" onClick={ScrollToTopFunc} />
        )}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/discover"
              element={
                <Discover favorites={favorites} setFavorites={setFavorites} />
              }
            />
            <Route path="/discover/:heroId" element={<SingleDiscover />} />
            <Route
              path="/imageGallery"
              element={
                <ImageGallery
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route path="/articles" element={<Articles />} />
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
