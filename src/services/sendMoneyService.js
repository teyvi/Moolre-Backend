const moolreClient = require("../config/axiosConfig");

async function sendMoney({
  type,
  channel,
  currency,
  receiver,
  amount,
  externalref,
  reference,
  accountnumber,
}) {
  try {
 
    const accountNumber = process.env.ACCOUNTNUMBER;
    if (!accountNumber) {
      throw new Error("Account Number is invalid check with Moorle");
    }

    const body = {
      type,
      channel,
      currency,
      receiver,
      amount,
      externalref,
      reference,
      accountnumber,
    };

    const response = await moolreClient.post("/transact/transfer", body);
    return response.data;
  } catch (error) {
    console.error(
      "Moolre transfer error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to initiate transfer"
    );
  }
}

module.exports = { sendMoney };
