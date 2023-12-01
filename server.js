const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());


app.get("/sendMessage", (req, res) => {
  const message = req.query.message;
  console.log(`Received message from client: ${message}`);
  const serverResponse = `Server received: "${message}"`;

  res.json({ response: serverResponse });
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Himan:1234@sit314.f2imupu.mongodb.net/SIT725_Week4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const messageSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

app.post('/sendMessage', async (req, res) => {
  const messageText = req.body.message;

  const newMessage = new Message({ message: messageText });
  console.log(`Received message from client: ${messageText}`);

  try {
    const savedMessage = await newMessage.save();

    res.json({ response: savedMessage });
  } catch (error) {
    console.error('Error saving message to MongoDB:', error);
    res.status(500).json({ error: 'Failed to save message to the database' });
  }
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});