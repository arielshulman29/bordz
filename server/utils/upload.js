const multer = require('multer');
var multerS3 = require('multer-s3')
const s3Config = require('../config/aws-config');


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        res.status(422).json({ message: 'Only jpg/jpeg files are allowed' });
    }
}

const storageResize = multerS3({
    s3: s3Config,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    key: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now().toString())
    }
});

const upload = multer({
    fileFilter: fileFilter,
    storage: storageResize
})

module.exports = upload;

// this is just to test locally if multer is working fine.
// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// })


