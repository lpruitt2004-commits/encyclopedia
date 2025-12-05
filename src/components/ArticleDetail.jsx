import "./ArticleDetail.css";

function ArticleDetail({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="article-detail-overlay" onClick={onClose}>
      <div className="article-detail" onClick={(e) => e.stopPropagation()}>
        <div className="article-detail-header">
          <button className="close-btn" onClick={onClose} aria-label="Close">
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="article-detail-content">
          <div className="article-meta">
            <span className="article-category-badge">{article.category}</span>
            <span className="article-date">
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-author">By {article.author}</div>

          <div className="article-body">
            <p>{article.content}</p>

            {/* You can add more content sections here */}
            <h2>Overview</h2>
            <p>{article.summary}</p>

            <h2>Key Points</h2>
            <ul>
              <li>Comprehensive coverage of the topic</li>
              <li>Practical examples and use cases</li>
              <li>Best practices and recommendations</li>
            </ul>

            <h2>Learn More</h2>
            <p>
              This article provides a foundation for understanding{" "}
              {article.title.toLowerCase()}. Continue exploring related topics
              to deepen your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
