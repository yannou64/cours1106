import mongoose from "mongoose"

const TokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {
            expires: 0
        }
    }
})

export const TokenBlackList = mongoose.model('blackListToken', TokenBlackListSchema)