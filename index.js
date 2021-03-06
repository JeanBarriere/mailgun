const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const Mailgun = require('mailgun-js')

app.get('/health', (req, res) => {
  res.send('OK')
})

app.post('/send', bodyParser.json(), async (req, res) => {
  const {
    API_KEY: apiKey,
    DOMAIN: domain
  } = process.env
  const {
    from,
    to,
    subject,
    text
  } = req.body
  const mailgun = Mailgun({
    apiKey,
    domain
  })
  const mailData = {
    from,
    to,
    subject,
    text
  }

  mailgun.messages().send(mailData, (error, body) => {
    res.send({
      error: error || 'false',
      body: body || { id: undefined, message: undefined }
    })
  })
})

app.listen(port, () => console.log(`listening on port ${port}!`))
