import mongoose, { Schema, models } from 'mongoose';

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
        type: [String],
        required: true
    }
}, { timestamps: true });

const FachDatei = models.FachDatei || mongoose.model('FachDatei', fachDateiSchema);

export default FachDatei;