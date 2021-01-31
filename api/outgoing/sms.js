const Twilio = require(`twilio`)

const {
  log,
  error,
} = console

const {
  TWILIO_TOKEN,
  TWILIO_ACCOUNT_ID,
} = process.env

const twilioClient = Twilio(TWILIO_ACCOUNT_ID, TWILIO_TOKEN)

module.exports = (req, res, next) => {
  const {
    to,
    from,
    body,
    mediaUrl,
  } = req.body

  if (!from || !to) {
    return res.status(400).send('Make sure to include `req.body.from` and `req.body.to`')
  }

  if (!body && !mediaUrl) {
    return res.status(400).send('Make sure to include `req.body.body` and/or `req.body.mediaUrl`')
  }

  log(`sending sms ${from} -> ${to}`)

  try {
    const message = await twilioClient.messages
      .create({
        mediaUrl,
        body,
        from,
        to,
      })

    return res.json(message)
  } catch (err) {
    error(`Error occurred while sending SMS: `, err)

    return res.sendStatus(500)
  }
}

