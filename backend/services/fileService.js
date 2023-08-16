const File = require('../models/FileModel');
const User = require('../models/UserModel');
const s3Service = require('./s3Service'); // Import the S3 service

// Upload file to S3 and save file document
exports.uploadAndSaveFile = async (file, userId) => {
  try {
    const { originalname, path } = file;

    // Upload the file to S3 and get the file URL
    const { Location: fileUrl, Key: fileKey } = await s3Service.uploadFileToS3(file);
    // Create a new file document with the S3 file URL
    const fileData = new File({
      name: originalname,
      owner: userId,
      url: fileUrl,
      fileKey,
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
    await s3Service.deleteFileFromS3(file.fileKey);
    await File.findByIdAndRemove(fileId).exec();
  } catch (error) {
    console.error('Error deleting and removing file:', error);
    throw error;
  }
};

// Share file with another user
exports.shareFileWithUser = async (fileId, email, read, write) => {
  try {
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    const user = await User.findOne({email});
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user._id.toString();

    if (file.owner.toString() === userId) {
      throw new Error('You are not authorized to share this file');
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
    const ownedFiles = await File.find({
       owner: userId ,
    });

    const sharedFiles = await File.find( { 'permissions.user': userId });

    return {ownedFiles, sharedFiles};
  } catch (error) {
    console.error('Error getting user files:', error);
    throw error;
  }
};
