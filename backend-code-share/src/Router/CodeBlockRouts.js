const express = require('express');
const router = express.Router();
const codeBlockController = require('../Controllers/CodeBlockController');


router.get('/getCodesBlocks',codeBlockController.getCodeBlocks );
router.get('/getBlockData', codeBlockController.getCodeBlockData);
router.post('/saveCode', codeBlockController.saveData );

module.exports = router;