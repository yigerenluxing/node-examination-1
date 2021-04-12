

const { Router } = require("express")
const player = Router();
const playerModel = require("../model/player")

const ERR_CODE400 = 400

const ERR_CODE404 = 404
const ERR_MSG404 = "Player not found"

const ERR_CODE405 = 405
const ERR_MSG405 = "Validation exception"

const err_code = 0
const msg = "ok"
let r = "/player"
player.post(r, async (req, res) => {
    try {
        let { id, name, position } = req.body
        await playerModel.create({ id, name, position })
        res.send({ err_code, msg })
    } catch (error) {
        console.log(error)
        return res.send({ err_code: ERR_CODE405, msg: ERR_MSG405 })
    }
})

player.put(r, async (req, res) => {
    try {
        let { id, name, position } = req.body
        await playerModel.updateOne({ id }, { id, name, position })
        res.send({ err_code, msg })
    } catch (error) {
        console.log(error)
        return res.send({ err_code: ERR_CODE405, msg: ERR_MSG405 })
    }
})

player.get(`${r}/:playerId`, async (req, res) => {
    try {
        let id = +req.params.playerId
        let result = await playerModel.findOne({ id }, { _id: 0, created_at: 0 }).lean()
        if (!result) {
            return res.send(ERR_CODE404, ERR_MSG404)
        }
        res.send({ err_code, data: result })
    } catch (error) {
        console.log(error)
        return res.send({ err_code: ERR_CODE405, msg: ERR_MSG405 })
    }
})

player.delete(`${r}/:playerId`, async (req, res) => {
    try {
        let id = req.params.playerId
        let result = await playerModel.remove({ id })
        res.send({ err_code, msg })
    } catch (error) {
        console.log(error)
        return res.send({ err_code: ERR_CODE405, msg: ERR_MSG405 })
    }
})
module.exports = player