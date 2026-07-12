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
},
{
    timestamps: true
});

// FIX: Pass "Note" as a string, and check mongoose.models first to prevent Next.js hot-reload crashes
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
        max: 500
    },
    date:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

// FIX: Pass "Journal" as a string, and check mongoose.models first to prevent Next.js hot-reload crashes
const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        trim:true,
        default: ''
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        enum:[3,2,1],
        default: 2,
    }
})
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

export {Note, Journal, Todo};