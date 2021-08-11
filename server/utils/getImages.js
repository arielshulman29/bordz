const s3 = require('../config/aws-config');

const getSignedUrl = async (key) => {
    try {
        let url = await s3.getSignedUrl('getObject', {
            Bucket: `${process.env.AWS_BUCKET_NAME}`,
            Key: key,
            Expires: 500
        })
        return url;
    }
    catch (e) {
        throw new Error(`Could not retrieve signed urls: ${e.message}`)
    }
}


module.exports = getSignedUrl;
