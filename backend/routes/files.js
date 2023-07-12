const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const fileController = require('../controllers/fileController');

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// File upload route
router.post('/upload', upload.single('file'), fileController.uploadFile);

// File delete route
router.delete('/delete/:fileId', fileController.deleteFile);

// File share route
router.post('/share/:fileId', fileController.shareFile);

module.exports = router;
