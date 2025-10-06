import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaPersonBooth,
  FaClock,
} from "react-icons/fa";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import "./Articles.css";
import { CgProfile } from "react-icons/cg";
import { useArticlesData } from "../hooks/useArticlesData";
import { useState, useEffect, useMemo } from "react";

const categories = [
  "All Articles",
  "Adventure",
  "Food & Culture",
  "Digital Nomad",
  "Beach Escapes",
  "Sustainable Travel",
  "Photography",
  "Travel Philosophy",
  "Budget Travel",
  "Cultural Journeys",
];
const sortFields = ["Most Recent", "Reading Time", "Title A-Z"];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("articleSelectedCategory") || "All Articles";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("articleSortBy") || "Recent";
  });
  const [filteredSearch, setFilteredSearch] = useState(() => {
    return localStorage.getItem("articleSearchedFilter") || "";
  });

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error ", error);
  };
  const { data: articlesData } = useArticlesData(onError, onSuccess);

  useEffect(() => {
    localStorage.setItem("articleSelectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("articleSortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("articleSearchedFilter", filteredSearch);
  }, [filteredSearch]);

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articlesData?.data || [];
    if (selectedCategory && selectedCategory !== "All Articles") {
      filtered = filtered.filter(
        (photo) => photo.category === selectedCategory
      );
      console.log("others");
    }
    if (filteredSearch && filteredSearch !== "") {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(filteredSearch.toLowerCase()) ||
          article.author.toLowerCase().includes(filteredSearch.toLowerCase())
      );
      console.log(filteredSearch);
    }
    if (sortBy === "Most Recent") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortBy === "Title A-Z") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Reading Time") {
      filtered = [...filtered].sort((a, b) => a.readTime - b.readTime);
    }

    return filtered;
  }, [articlesData, selectedCategory, sortBy, filteredSearch]);

  return (
    <div className="articlesPage" id="home">
      <div className="articleDiv">
        <div className="articleText">
          <h3>Travel Stories & Guides</h3>
          <p className="articleParagraph">
            Discover inspiring stories, practical guides, and insider tips from
            fellow travelers and travel experts around the world.
          </p>
          <div className="articleFiltersDiv">
            <div className="filters" id="articlesFilterSearch">
              <FaSearch />
              <input
                type="text"
                className=""
                placeholder="Search articles, authors, tags..."
                value={filteredSearch || ""}
                onChange={(e) => setFilteredSearch(e.target.value)}
              />
            </div>
            <div className="filters">
              <FaFilter />
              <Menu as="div" className="articlesDropDownDiv">
                <MenuButton as="div" className="articlesMenuButton">
                  <p>{selectedCategory}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems
                  anchor="bottom"
                  as="div"
                  className="articlesFilterDropDown"
                >
                  {categories.map((option) => (
                    <MenuItem
                      as="p"
                      key={option}
                      className="articleOptions"
                      onClick={() => setSelectedCategory(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className="filters">
              <Menu as="div" className="articlesDropDownDiv">
                <MenuButton as="div" className="articlesMenuButton">
                  <p>{sortBy}</p>
                  <FaChevronDown />
                </MenuButton>

                <MenuItems
                  anchor="bottom"
                  as="div"
                  className="articlesFilterDropDown"
                >
                  {sortFields.map((sortItems) => (
                    <MenuItem
                      as="p"
                      key={sortItems}
                      className="articleOptions"
                      onClick={() => setSortBy(sortItems)}
                    >
                      {sortItems}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="articlesContainer">
        <div className="articlesContainerSubDiv">
          <p className="showingArticles">
            Showing {filteredAndSortedArticles.length} articles
          </p>
          <hr />
          <h3>Featured Articles</h3>
          <div className="articlesHolder">
            {filteredAndSortedArticles.map((article) => {
              return (
                <figure className="articleFigure">
                  <p className="articleCategory">{article.category}</p>
                  <img src={article.image} alt="" className="articleImg" />
                  <div className="articleFigureText">
                    <a href={article.externalUrl} className="articleTitle">
                      {article.title}
                    </a>
                    <p>{article.excerpt}</p>
                    <div className="articleFigureTags">
                      <span className="tags">{article.tags[0]}</span>
                      <span className="tags">{article.tags[1]}</span>
                      <span className="tags">{article.tags[2]}</span>
                    </div>
                    <div className="articleFigureInfo">
                      <div className="articleFigureInfoflex">
                        <CgProfile />
                        <p className="articleAuthor">{article.author}</p>
                      </div>
                      <p className="articleDate">
                        {article.publishDate} &bull; <FaClock />{" "}
                        {article.readTime}min
                      </p>
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
