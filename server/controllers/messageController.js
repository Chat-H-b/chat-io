const { Message, User, Room } = require("../models");
const user = require("../models/user");

class messageController {
  static async readMessage(req, res) {
    const { roomId } = req.params;
    try {
      const messages = await Message.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"], // Menampilkan hanya username dan email
          },
          {
            model: Room,
            attributes: ["name"], // Menampilkan nama room
          },
        ],
        where: {
          roomId,
        },
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createMessage(req, res) {
    const { message_text } = req.body;
    const { roomId } = req.params;
    const { userId, email, username } = req.loginInfo;
    try {
      console.log(userId, email, username);

      const newMessage = await Message.create({ roomId, userId, message_text });

      res.status(200).json(newMessage);
    } catch (error) {
      console.log(error);
    }

    // const
  }
}

module.exports = messageController;
