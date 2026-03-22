const Analysis = require('../models/Analysis');
const { analyzeSentiment } = require('../utils/sentimentAnalyzer');

// Analyze sentiment
exports.analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Text is required' });
    }

    // Perform sentiment analysis
    const result = analyzeSentiment(text);

    // Save to database
    const analysis = new Analysis({
      text,
      sentiment: result.sentiment,
      confidence: result.confidence,
      score: result.score,
    });

    await analysis.save();

    res.status(200).json({
      message: 'Sentiment analysis completed',
      data: {
        text,
        ...result,
        _id: analysis._id,
        createdAt: analysis.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing sentiment', error: error.message });
  }
};

// Get all analyses
exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Analyses retrieved successfully',
      data: analyses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analyses', error: error.message });
  }
};

// Get analysis by ID
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({
      message: 'Analysis retrieved successfully',
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analysis', error: error.message });
  }
};

// Delete analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findByIdAndDelete(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting analysis', error: error.message });
  }
};
