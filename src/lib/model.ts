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
        max: 1500
    }
},
{
    timestamps: true
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);


const journalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true,
        max: 1500
    },
    date:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        trim: true,
        default: ''
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    priority:{
        type: Number,
        enum: [1, 2, 3],
        default: 2,
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export {Note, Journal, Todo};
