const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');
const upload = require('../middlewares/uploadMiddleware');

// File upload route
router.post('/upload', authMiddleware.authenticateUser, upload.single('file'), fileController.uploadFile);

// File delete route
router.delete('/delete/:fileId', authMiddleware.authenticateUser, fileController.deleteFile);

// File share route
router.post('/share/:fileId', authMiddleware.authenticateUser, fileController.shareFile);

router.get('/user-files', authenticateUser, fileController.getUserFiles);

module.exports = router;
