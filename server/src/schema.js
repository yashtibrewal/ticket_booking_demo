const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const bookMovieSchema = new Schema({
    movie: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
    seats: {
        A1: {
            type: Number,
            required: true,
        },
        A2: {
            type: Number,
            required: true,
        },
        A3: {
            type: Number,
            required: true,
        },
        A4: {
            type: Number,
            required: true,
        },
        D1: {
            type: Number,
            required: true,
        },
        D2: {
            type: Number,
            required: true,
        }
    }
});

// Create and export the model
const BookMovie = mongoose.model('BookMovie', bookMovieSchema);

bookMovieSchema.index({ _id: -1 });

module.exports = {
    BookMovie
};
