const { sendSMS } = require('../services/sendSMSService');

exports.sendSMS = async (req, res) => {
  try {
    const { type, senderid, messages } = req.body;

    // Validate required fields
    if (!type || !senderid || !messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    // Optional: validate each message object
    for (const msg of messages) {
      if (!msg.recipient || !msg.message) {
        return res.status(400).json({ message: 'Each message must include recipient and message' });
      }
    }

    const result = await sendSMS({ type, senderid, messages });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in SMS controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};