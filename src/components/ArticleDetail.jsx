import "./ArticleDetail.css";

function ArticleDetail({ article, onClose }) {
  if (!article) return null;

  // Simple function to render content with proper formatting
  const renderContent = (content) => {
    // Split by double newlines to get paragraphs/sections
    const sections = content.split("\n\n");

    return sections.map((section, idx) => {
      // Check if it's a heading (starts with ##)
      if (section.startsWith("## ")) {
        return <h2 key={idx}>{section.replace("## ", "")}</h2>;
      }

      // Check if it's a list (contains lines starting with - or *)
      if (
        section.includes("\n- ") ||
        section.includes("\n* ") ||
        section.startsWith("- ") ||
        section.startsWith("* ")
      ) {
        const items = section
          .split("\n")
          .filter((line) => line.startsWith("- ") || line.startsWith("* "));
        return (
          <ul key={idx}>
            {items.map((item, i) => (
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: formatText(item.replace(/^[*-] /, "")),
                }}
              />
            ))}
          </ul>
        );
      }

      // Check if it's a bold section (starts with **)
      if (section.startsWith("**") && section.includes("**:")) {
        return (
          <p key={idx}>
            <strong dangerouslySetInnerHTML={{ __html: formatText(section) }} />
          </p>
        );
      }

      // Regular paragraph
      return (
        <p
          key={idx}
          dangerouslySetInnerHTML={{ __html: formatText(section) }}
        />
      );
    });
  };

  // Format text with bold, links, etc.
  const formatText = (text) => {
    let formatted = text;

    // Bold text **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // External links [text](url)
    formatted = formatted.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Internal article links [[Article Title]]
    formatted = formatted.replace(
      /\[\[([^\]]+)\]\]/g,
      '<a href="#" class="internal-link" data-article="$1">$1</a>'
    );

    return formatted;
  };

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

          <div className="article-body">{renderContent(article.content)}</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
