import "./ArticleCard.css";

function ArticleCard({ title, summary, category, onClick }) {
  return (
    <article className="article-card" onClick={onClick}>
      <div className="article-category">{category}</div>
      <h3 className="article-title">{title}</h3>
      <p className="article-summary">{summary}</p>
      <div className="article-footer">
        <button className="read-more">Read More →</button>
      </div>
    </article>
  );
}

export default ArticleCard;
