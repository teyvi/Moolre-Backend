const moolreClient = require('../config/axiosConfig');

async function sendSMS({ type, senderid, messages }) {
  try {
    const body = { type, senderid, messages };

    const response = await moolreClient.post('/sms/send', body);
    return response.data;
  } catch (error) {
    console.error('Moolre SMS error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send SMS');
  }
}

module.exports = { sendSMS };