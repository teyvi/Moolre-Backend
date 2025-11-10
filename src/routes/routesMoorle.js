const express = require("express");
const router = express.Router();
const { validateName } = require("../controllers/nameValidationController");
const { sendMoney } = require("../controllers/sendMoneyController");
const { sendSMS } = require("../controllers/sendSMSController");
 
//Route to validate name
router.post("/validate", validateName);
router.post("/sendmoney", sendMoney);
router.post("/sendsms", sendSMS);

 

module.exports = router;
