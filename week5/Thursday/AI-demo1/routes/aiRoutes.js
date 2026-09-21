const express = require('express');
const router = express.Router();

const generateText1 = require('../controllers/textController1');
const generateText2 = require('../controllers/textController2');

// Text generation routes
router.post('/generate-text1', generateText1);
router.post('/generate-text2', generateText2);

module.exports = router;
