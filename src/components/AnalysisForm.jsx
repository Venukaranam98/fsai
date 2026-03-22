import { useState } from 'react';
import './AnalysisForm.css';

function AnalysisForm({ onAnalyze }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setLoading(true);
    try {
      await onAnalyze(text);
      setText('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-form-container">
      <form className="analysis-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text-input">Enter text to analyze:</label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            rows="5"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </form>
    </div>
  );
}

export default AnalysisForm;
