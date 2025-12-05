import { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import CategoryFilter from "./components/CategoryFilter";
import { articles, categories } from "./data/articles";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    let result = articles;

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((article) => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setShowWelcome(false);
    }

    setFilteredArticles(result);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowWelcome(false);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    document.body.classList.add("modal-open");
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    document.body.classList.remove("modal-open");
  };

  const handleBrowseClick = () => {
    setShowWelcome(false);
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
              aria-label="Search encyclopedia"
            />
          </form>

          <button
            className="menu-button"
            onClick={() => setShowWelcome(true)}
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
                  {categories.slice(1).map((category) => (
                    <div
                      key={category}
                      className="topic-card"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowWelcome(false);
                      }}
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
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
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
