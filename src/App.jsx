import { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // TODO: Implement search functionality
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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          <section className="welcome fade-in">
            <h1 className="welcome-title">Welcome to Encyclopedia</h1>
            <p className="welcome-subtitle">
              Your mobile-first progressive web app for exploring knowledge
            </p>

            <div className="welcome-features">
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Mobile First</h3>
                <p className="feature-description">
                  Optimized for mobile devices with a responsive design that
                  works seamlessly on any screen size.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                  Built with modern web technologies for instant loading and
                  smooth performance.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔌</div>
                <h3 className="feature-title">Works Offline</h3>
                <p className="feature-description">
                  Progressive Web App capabilities allow you to access content
                  even without an internet connection.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3 className="feature-title">Easy Search</h3>
                <p className="feature-description">
                  Quickly find the information you need with our powerful search
                  functionality.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3 className="feature-title">Beautiful UI</h3>
                <p className="feature-description">
                  Clean and modern interface with support for both light and
                  dark modes.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3 className="feature-title">Accessible</h3>
                <p className="feature-description">
                  Designed with accessibility in mind to ensure everyone can use
                  the app.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

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
