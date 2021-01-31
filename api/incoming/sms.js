const { cleanNumber } = require(`../_util`)
const twilio = require(`twilio`)

const { MessagingResponse } = twilio.twiml

const {
  log,
  error,
} = console

module.exports = async (req, res, next) => {
  const {
    SmsSid: sid,
    Body,
    To,
    From
  } = req.body

  const cleanTo = cleanNumber(To)
  const cleanFrom = cleanNumber(From)

  log(`incoming message ${sid}: ${cleanFrom} -> ${cleanTo}`)

  // TODO Send notification?

  const response = new MessagingResponse()

  return res.status(204).end()
}
