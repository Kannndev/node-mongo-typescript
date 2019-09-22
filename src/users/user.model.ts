import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    age: {
        required: true,
        type: Number,
        unique: false,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    name: {
        required: true,
        type: String,
        unique: false,
    },
    userId: {
        required: true,
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});
