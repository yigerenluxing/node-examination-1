
/**
 * NBA player
 */

const mongoose = require('mongoose');

const { Schema } = mongoose
const db = require("../lib/mongodb")


const playerSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})
const playerModel= db.model("player", playerSchema)

module.exports = playerModel
