const twilio = require(`twilio`)

const { VoiceResponse } = twilio.twiml

const {
  log,
  error,
} = console

module.exports = (req, res, next) => {
  // `from` = owned number to show on Caller ID
  let {
    from: callerId,
    to,
  } = req.body

  const voiceResponse = new VoiceResponse()

  log(`making outgoing call from ${callerId} to ${to}`)

  const dial = voiceResponse.dial({
    callerId
  })

  // If country code isn't included, assume +1 (US)
  if (to.length < 11) {
    to + `+1${to}`
  }

  dial.number(to)

  return res.send(dial.toString())
}

