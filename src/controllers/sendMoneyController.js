const { sendMoney } = require("../services/sendMoneyService");

exports.sendMoney = async (req, res) => {
  try {
    const {
      type,
      channel,
      currency,
      receiver,
      sublistid,
      amount,
      externalref,
      reference,
      accountnumber,
    } = req.body;

    // Validate required fields
    if (
      !type ||
      !channel ||
      !currency ||
      !receiver ||
      !amount ||
      !externalref ||
      !reference ||
      !accountnumber
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await sendMoney({
      type,
      channel,
      currency,
      receiver,
      sublistid,
      amount,
      externalref,
      reference,
      accountnumber,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in transfer controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};
