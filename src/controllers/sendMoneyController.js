const { sendMoney } = require('../services/sendMoneyService');

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
      accountnumber
    } = req.body;

    // Validate required fields
    if (!type || !channel || !currency || !receiver || !amount || !externalref || !reference || !accountnumber) {
      return res.status(400).json({ message: 'Missing required fields' });
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
      accountnumber
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in transfer controller:', error.message);
    res.status(500).json({ message: error.message });
  }

  // save transaction record
await Transaction.create({
  externalRef: externalref,
  moolreTransactionId: result?.data?.transactionid,
  thirdPartyRef: result?.data?.thirdpartyref,
  accountNumber: accountnumber,
  receiver,
  receiverName: result?.data?.receivername,
  amount,
  currency,
  channel,
  type,
  sublistId: sublistid,
  reference,
  txStatus: result?.data?.txstatus ?? 0,
  statusMessage: result?.message?.join(', ') || 'Transaction initiated',
  amountFee: result?.data?.amountfee,
  networkFee: result?.data?.networkfee,
  fee: result?.data?.fee,
  initiatedBy: req.user?._id || 'system'
});
};