import "./ArticleList.css";
import ArticleCard from "./ArticleCard";

function ArticleList({ articles, onArticleClick }) {
  if (articles.length === 0) {
    return (
      <div className="no-results">
        <p>No articles found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          summary={article.summary}
          category={article.category}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
}

export default ArticleList;
