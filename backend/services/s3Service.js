const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

// Upload file to S3 bucket
exports.uploadFileToS3 = async (file) => {
  try {
    const { originalname, path, mimetype } = file;
    const fileKey = `${uuidv4()}-${originalname}`;
    const fileStream = fs.createReadStream(path);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: fileStream,
      ContentType: mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    // Return the S3 file URL
    return uploadResult;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

exports.deleteFileFromS3 = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    };

    const s3 = new AWS.S3();
    await s3.deleteObject(params).promise();
  } catch (error) {
   console.log(error)
  }
};
