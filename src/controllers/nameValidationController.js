const { validateAccountName } = require("../services/nameValidationService");
const Validation = require("../model/validations");

exports.validateName = async (req, res) => {
  try {
    const { type, receiver, channel, currency, accountnumber } = req.body;

    //validate the required fields
    if (!type || !receiver || !channel || !currency || !accountnumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await validateAccountName({
      type,
      receiver,
      channel,
      currency,
      accountnumber,
    });

    // Store validation data in MongoDB after successful validation
    try {
      const validationRecord = new Validation({
        type,
        receiver,
        channel,
        currency,
        accountnumber,
        validationStatus: "success",
        validationResponse: result,
      });

      await validationRecord.save();
      console.log("Validation data saved successfully");
    } catch (saveError) {
      console.error("Error saving validation data:", saveError.message);
      // Don't fail the request if saving fails, just log the error
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in name validation controller:", error.message);

    // Store failed validation attempt
    try {
      const failedValidation = new Validation({
        type: req.body.type,
        receiver: req.body.receiver,
        channel: req.body.channel,
        currency: req.body.currency,
        accountnumber: req.body.accountnumber,
        validationStatus: "failed",
        validationResponse: { error: error.message },
      });

      await failedValidation.save();
    } catch (saveError) {
      console.error("Error saving failed validation data:", saveError.message);
    }

    res.status(500).json({ message: error.message });
  }
};


