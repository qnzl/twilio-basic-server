const Twilio = require(`twilio`)

const {
  log,
  error,
} = console

const {
  TWILIO_TOKEN,
  TWILIO_ACCOUNT_ID,
  PHONE_BASE_SERVICE_URL,
} = process.env

const twilioClient = Twilio(TWILIO_ACCOUNT_ID, TWILIO_TOKEN)

module.exports = (req, res, next) => {
  const {
    number,
    name,
  } = req.body

  if (!number || !name) {
    error(`include a number and name to buy`)

    return res.sendStatus(400)
  }

  try {
    log(`buying ${number}`)

    const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
      friendlyName: name,
      phoneNumber: number,
      voiceUrl: `${PHONE_BASE_SERVICE_URL}/api/incoming/call`,
      smsUrl: `${PHONE_BASE_SERVICE_URL}/api/incoming/sms`,
      statusCallback: `${PHONE_BASE_SERVICE_URL}/api/call-complete`,
      statusCallbackEvent: [ `completed` ],
    })

    const { sid, phoneNumber: number } = purchasedNumber

    return res.json({
      sid,
      number,
    })
  } catch (err) {
    error(`error occurred while buying number`, err)

    return res.sendStatus(500)
  }
}
