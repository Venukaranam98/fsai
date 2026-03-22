const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

// Routes
router.post('/analyze', analysisController.analyzeSentiment);
router.get('/analyses', analysisController.getAllAnalyses);
router.get('/analyses/:id', analysisController.getAnalysisById);
router.delete('/analyses/:id', analysisController.deleteAnalysis);

module.exports = router;
