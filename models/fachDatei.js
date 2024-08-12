import mongoose, { Schema, models } from 'mongoose';

const themaSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const fachDateiSchema = new Schema({
    fach: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    themen: {
        type: [themaSchema],
        required: true
    }
}, { timestamps: true });

const FachDatei = models.FachDatei || mongoose.model('FachDatei', fachDateiSchema);

export default FachDatei;