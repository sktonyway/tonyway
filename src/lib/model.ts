import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    is_trash: {
        type: Boolean,
        default: false
    },
    is_archieve: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    },
    labels: {
        type: [String]
    },
    is_public: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);


const journalSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    date: {
        type: Date,
        default: Date.now
    },
    is_trash: {
        type: Boolean,
        default: false
    },
    is_archieve: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    },
    labels: {
        type: [String]
    },
    is_public: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        trim: true,
        default: ''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        enum: [1, 2, 3],
        default: 2,
    },
    date: {
        type: Date,
        default: Date.now
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);


const userSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
    profile_pic: String,
    dob: String,
},
{
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export { Note, Journal, Todo, User };
