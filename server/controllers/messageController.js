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
    const { roomId } = req.params;
    const { userId, email, username } = req.loginInfo;
    const { message_text } = req.body;
  
    console.log(userId, email, username);
  
    try {
      let finalMessageText;
  
      // Cek apakah ada file yang diupload
      if (req.file) {
        console.log("File uploaded: ", req.file); // Log file info
  
        const fileUrl = req.file.path || req.file.secure_url; // Path dari Multer atau URL dari Cloudinary
  
        if (!fileUrl) {
          return res.status(500).json({ message: "Failed to upload image" });
        }
  
        // Gunakan URL file sebagai message_text
        finalMessageText = fileUrl;
  
      } else if (message_text) {
        // Jika tidak ada file, gunakan teks dari body
        finalMessageText = message_text;
      } else {
        return res.status(400).json({ message: "Message text or image is required" });
      }
  
      // Simpan message ke database
      const newMessage = await Message.create({
        roomId,
        userId,
        message_text: finalMessageText, // Teks atau URL file
      });
  
      res.status(201).json(newMessage);
  
    } catch (error) {
      console.error("Error during message creation:", error); // Tampilkan error di console
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  
  
}
module.exports = messageController;
