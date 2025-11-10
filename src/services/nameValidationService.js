const moolreClient = require("../config/axiosConfig");

async function validateAccountName({
  type,
  receiver,
  channel,
  currency,
  accountnumber,
}) {
  try {
    //add accountnumber from env
    const accountNumber = process.env.ACCOUNTNUMBER;
    if (!accountNumber) {
      throw new Error("Account Number is invalid check with Moorle");
    }
    const body = { type, receiver, channel, currency, accountnumber };

    const response = await moolreClient.post("/transact/validate", body);
    return response.data;
  } catch (error) {
    console.error(
      "Moolre validation error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to validate account"
    );
  }
}

module.exports = { validateAccountName };
