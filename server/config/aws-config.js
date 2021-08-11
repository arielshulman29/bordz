const AWS = require('aws-sdk');

const options = {
    accessKeyId: process.env.AWS_IAM_USER_KEY,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    region: process.env.AWS_REGION
}

const s3Config = new AWS.S3(options);


module.exports = s3Config;