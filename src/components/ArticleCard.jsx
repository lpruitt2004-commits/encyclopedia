import "./ArticleCard.css";

function ArticleCard({ title, summary, category, tags = [], onClick }) {
  return (
    <article className="article-card" onClick={onClick}>
      <div className="article-category">{category}</div>
      <h3 className="article-title">{title}</h3>
      <p className="article-summary">{summary}</p>
      {tags.length > 0 && (
        <div className="article-tags" aria-label="Article tags">
          {tags.slice(0, 6).map((tag) => (
            <span className="tag-pill" key={tag}>
              {tag}
            </span>
          ))}
          {tags.length > 6 && (
            <span className="tag-pill more-pill">+{tags.length - 6}</span>
          )}
        </div>
      )}
      <div className="article-footer">
        <button className="read-more">Read More →</button>
      </div>
    </article>
  );
}

export default ArticleCard;
