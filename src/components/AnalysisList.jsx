import './AnalysisList.css';

function AnalysisList({ analyses, loading, onDelete }) {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      case 'neutral':
        return 'sentiment-neutral';
      default:
        return '';
    }
  };

  if (loading && analyses.length === 0) {
    return <div className="loading">Loading analyses...</div>;
  }

  if (analyses.length === 0) {
    return <div className="no-data">No analyses yet. Start by analyzing some text!</div>;
  }

  return (
    <div className="analyses-container">
      <h2>Analysis History</h2>
      <div className="analyses-list">
        {analyses.map((analysis) => (
          <div key={analysis._id} className="analysis-card">
            <div className="analysis-header">
              <span className={`sentiment-badge ${getSentimentColor(analysis.sentiment)}`}>
                {analysis.sentiment.toUpperCase()}
              </span>
              <button
                className="delete-btn"
                onClick={() => onDelete(analysis._id)}
                title="Delete"
              >
                ×
              </button>
            </div>
            <p className="analysis-text">{analysis.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisList;
