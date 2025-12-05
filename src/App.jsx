import { useState, useEffect, useMemo } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import CategoryFilter from "./components/CategoryFilter";
import { articles, categories } from "./data/articles";
import useLcarsAudio from "./useLcarsAudio";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [showWelcome, setShowWelcome] = useState(true);
  const { playNav, playAffirm, playDismiss } = useLcarsAudio();

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(categories));
    const withoutAll = unique.filter((c) => c !== "All");
    return ["All", ...withoutAll.sort((a, b) => a.localeCompare(b))];
  }, []);

  useEffect(() => {
    let result = articles;

    if (selectedCategory !== "All") {
      result = result.filter((article) => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setShowWelcome(false);
    }

    const sorted = [...result].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredArticles(sorted);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowWelcome(false);
    playNav();
  };

  const handleArticleClick = (article) => {
    playAffirm();
    setSelectedArticle(article);
    document.body.classList.add("modal-open");
  };

  const handleCategoryChange = (category) => {
    playNav();
    setSelectedCategory(category);
    setShowWelcome(false);
    if (searchQuery) {
      setSearchQuery("");
    }
  };

  const handleInternalLink = (title) => {
    playAffirm();
    const target = articles.find((a) => a.title === title);
    if (!target) return;
    setSelectedArticle(target);
    setShowWelcome(false);
    document.body.classList.add("modal-open");
  };

  const handleCloseArticle = () => {
    playDismiss();
    setSelectedArticle(null);
    document.body.classList.remove("modal-open");
  };

  const handleBrowseClick = () => {
    playAffirm();
    setShowWelcome(false);
  };

  const handleHomeClick = () => {
    playNav();
    setShowWelcome(true);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <svg
              className="logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>Encyclopedia</span>
          </div>

          <form className="search-container" onSubmit={handleSearch}>
            <input
              type="search"
              className="search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={playNav}
              aria-label="Search encyclopedia"
            />
          </form>

          <button
            className="menu-button"
            onClick={handleHomeClick}
            aria-label="Home"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {showWelcome ? (
            <section className="welcome-section fade-in">
              <div className="britannica-hero">
                <div className="picard-quote">
                  <svg
                    className="quote-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <blockquote>
                    <p className="quote-text">
                      "The acquisition of knowledge is not for material gain,
                      but for personal growth. To expand the mind, to seek out
                      new ideas and perspectives—this is what makes us better,
                      what enriches the human experience."
                    </p>
                    <footer className="quote-author">
                      — Captain Jean-Luc Picard
                    </footer>
                  </blockquote>
                </div>
                <h1 className="hero-title">Encyclopedia</h1>
                <p className="hero-tagline">
                  Explore trusted knowledge on thousands of topics
                </p>
                <button className="browse-btn" onClick={handleBrowseClick}>
                  Browse Articles
                </button>
              </div>

              <div className="featured-topics">
                <h2 className="section-title">Featured Topics</h2>
                <div className="topic-grid">
                  {categoryOptions
                    .filter((category) => category !== "All")
                    .map((category) => (
                      <div
                        key={category}
                        className="topic-card"
                        onClick={() => handleCategoryChange(category)}
                      >
                        <h3>{category}</h3>
                        <p>
                          {
                            articles.filter((a) => a.category === category)
                              .length
                          }{" "}
                          articles
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="articles-section fade-in">
              <div className="section-header">
                <h2 className="section-title">
                  {selectedCategory === "All"
                    ? "All Articles"
                    : selectedCategory}
                </h2>
                <p className="article-count">
                  {filteredArticles.length} article
                  {filteredArticles.length !== 1 ? "s" : ""}
                </p>
              </div>

              <CategoryFilter
                categories={categoryOptions}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />

              <ArticleList
                articles={filteredArticles}
                onArticleClick={handleArticleClick}
              />
            </section>
          )}
        </div>
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={handleCloseArticle}
          onInternalLink={handleInternalLink}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p>
            &copy; {new Date().getFullYear()} Encyclopedia. A mobile-first PWA.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
