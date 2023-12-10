const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST route for sending a message
router.post("/sendMessage", async (req, res) => {
  const messageText = req.body.message;

  const newMessage = new Message({ message: messageText });
  console.log(`Received message from client: ${messageText}`);

  try {
    const savedMessage = await newMessage.save();
    res.json({ response: savedMessage });
  } catch (error) {
    console.error("Error saving message to MongoDB:", error);
    res.status(500).json({ error: "Failed to save message to the database" });
  }
});

router.get('/sendMessage', async (req, res) => {
  try {
    const messages = await Message.find({}, 'message timestamp').sort({ timestamp: -1 });
    res.json({ messages });
  } catch (error) {
    console.error('Error retrieving messages from MongoDB:', error);
    res.status(500).json({ error: 'Failed to retrieve messages from the database' });
  }
});

module.exports = router;
