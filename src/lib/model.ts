import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true,
        max: 500
    }
});

// FIX: Pass "Note" as a string, and check mongoose.models first to prevent Next.js hot-reload crashes
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export {Note};