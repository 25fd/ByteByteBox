const File = require('../models/FileModel');
const User = require('../models/UserModel');
const s3Service = require('./s3Service'); // Import the S3 service

// Upload file to S3 and save file document
exports.uploadAndSaveFile = async (file, userId) => {
  try {
    const { originalname, path } = file;

    // Upload the file to S3 and get the file URL
    const fileUrl = await s3Service.uploadFileToS3(file);

    // Create a new file document with the S3 file URL
    const fileData = new File({
      name: originalname,
      owner: userId,
      url: fileUrl,
      permissions: [
        { user: userId, read: true, write: true } // Give the owner read and write permissions by default
      ],
    });

    await fileData.save();

    return fileData;
  } catch (error) {
    console.error('Error uploading and saving file:', error);
    throw error;
  }
};

// Delete file from S3 and remove file document
exports.deleteAndRemoveFile = async (fileId) => {
  try {
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    // Delete the file from S3
    await s3Service.deleteFileFromS3(file.url);

    await file.remove();
  } catch (error) {
    console.error('Error deleting and removing file:', error);
    throw error;
  }
};

// Share file with another user
exports.shareFileWithUser = async (fileId, userId, read, write) => {
  try {
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    if (file.owner.toString() !== userId) {
      throw new Error('You are not authorized to share this file');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const permissions = file.permissions.find((permission) => permission.user.toString() === userId);
    if (permissions) {
      permissions.read = read;
      permissions.write = write;
    } else {
      file.permissions.push({ user: userId, read, write });
    }

    await file.save();
  } catch (error) {
    console.error('Error sharing file:', error);
    throw error;
  }
};

// Get all files of the authenticated user
exports.getUserFiles = async (userId) => {
  try {
    // Find all files where the user is the owner or in the permissions array
    const userFiles = await File.find({
      $or: [
        { owner: userId },
        { 'permissions.user': userId },
      ],
    });

    return userFiles;
  } catch (error) {
    console.error('Error getting user files:', error);
    throw error;
  }
};
