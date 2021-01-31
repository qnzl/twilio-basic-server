const { cleanNumber } = require(`../_util`)
const twilio = require(`twilio`)

const { VoiceResponse } = twilio.twiml

const {
  log,
  error,
} = console

// TODO Change this
const FORWARDED_NUMBER = `+11234567890`

module.exports = (req, res, next) => {
  const {
    CallSid: sid,
    To,
    From,
  } = req.body

  const cleanTo = cleanNumber(To)
  const cleanFrom = cleanNumber(From)

  log(`incoming call ${sid}: ${cleanFrom} -> ${cleanTo}`)

  // TODO Insert your call-blocking logic here

  const shouldForwardCall = true

  const response = new VoiceResponse()

  if (shouldForwardCall) {
    const dial = response.dial({
      callerId: req.body.from
    })

    dial.number(FORWARDED_NUMBER)
  } else {
    response.reject()
  }

  return res.send(response.toString())
}
