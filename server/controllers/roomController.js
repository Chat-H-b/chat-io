const { Message, User, Room } = require("../models");

class roomController {
    static async readRoom(req, res, next) {
        try {
            const room = await Room.findAll()
            res.status(200).json(room)
        } catch (error) {
            console.log(error);

        }
    }
}
module.exports = roomController