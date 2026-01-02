import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timeStamp: {
                type: Number
            }
        }
    ]
}, { timestamps: true })

export const URL = mongoose.model('Url', urlSchema)