import mongoose, { Schema, models } from "mongoose";

const contentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    seitenzahl: {
        type: Number,
        required: true
    }
});

const seitenSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    content: [contentSchema] 
}, { timestamps: true });

const SeitenSchema = models.SeitenSchema || mongoose.model("SeitenSchema", seitenSchema);

export default SeitenSchema;