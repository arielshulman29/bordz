const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//including virtuals when converting to json
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String,
    key: String
});
// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload','/upload/w_200')
// });

const BoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    boardType:
    {
        type: String,
        enum: ['Longboard', 'Shortboard', 'Funboard'],
        required: true
    },
    images: [ImageSchema],
    price: Number,
    brand: String,
    year: Number,
    volume: Number,
    length: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    phone: String,
    sold: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
    tags: [String],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

// BoardSchema.post('findOneAndDelete', async function (doc) {
//     if(doc){
//         await Review.remove({
//             _id: {
//                 $in: doc.reviews
//             }
//         })
//     }
// });

//for the clustermap- a virtual of properties so we can address it everywhere
// BoardSchema.virtual('properties.popUpMarkUp').get(function () {
//     return `<h6>${this.title}</h6><a href="/posts/${this.id}">View Board</a>`
// });

module.exports = mongoose.model('Board', BoardSchema);