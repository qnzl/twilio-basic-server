const {
  log,
} = console

module.exports = (req, res, next) => {
  const {
    CallStatus,
    Duration,
    To,
    From,
  } = req.body

  // TODO Useful for tracking minute usage of users

  log(`call status (${CallStatus}): ${From} -> ${To} for ${Duration} minutes`)
}
