import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AnalysisForm from './components/AnalysisForm';
import AnalysisList from './components/AnalysisList';

const API_BASE_URL = 'https://fsai-ft9d.onrender.com/api';

function App() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/analyses`);
      setAnalyses(response.data.data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeText = async (text) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, { text });
      setAnalyses([response.data.data, ...analyses]);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  const handleDeleteAnalysis = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/analyses/${id}`);
      setAnalyses(analyses.filter((analysis) => analysis._id !== id));
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Sentiment Analysis</h1>
        <p>Analyze the sentiment of your text using machine learning</p>
      </header>
      <main className="main-container">
        <AnalysisForm onAnalyze={handleAnalyzeText} />
        <AnalysisList
          analyses={analyses}
          loading={loading}
          onDelete={handleDeleteAnalysis}
        />
      </main>
    </div>
  );
}

export default App;
