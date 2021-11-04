require('dotenv').config()
const amqplib = require('amqplib')
const cron = require('node-cron')
const express = require('express')
const logger = require('morgan')
const enableWs = require('express-ws')
const fs = require('fs')

const QUEUE = process.env.QUEUE
const LOGFILE = process.env.LOGFILE
// const PORT = process.env.PORT
// const SOCKET_PORT = process.env.SOCKET_PORT

const app = express()
app.use(logger('common'))

enableWs(app)

const msgToQueue = async (message) => {
  const client = await amqplib.connect('amqp://localhost:5672')
  const channel = await client.createChannel()
  await channel.assertQueue(QUEUE)
  console.log(QUEUE)
  //const message = 'MESSAGE SENT'

  //channel.sendToQueue(QUEUE, Buffer.from(message), { contentType: 'text/plain', })
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)), { contentType: 'application/json', })
  await channel.close()
  await client.close()
}

;(() => {
  // const client = await amqplib.connect('amqp://localhost:5672')
  // const channel = await client.createChannel()
  // await channel.assertQueue(queue)
  // const message = { hello: 'world' }
  // channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
  //   contentType: 'application/json',
  // })
  cron.schedule('0 * * * * *', () => {
    const date  = new Date()
    const message = {data: `I'm alive at ${date}`}
    // console.log(`Sent to ws ${message}`)
    msgToQueue(message).then(() => 
    {
      console.log(`Sent to queue: ${JSON.stringify(message)}`)
      fs.appendFile(LOGFILE, `[PRODUCER] ${message.data}\n`, (err) => 
      {
        if (err) 
        {
          console.log(err)
        }
      })
    })
  })

  cron.schedule('0 42 * * * *', () => {
    const message = {data: '42 is the meaing of life'}
    msgToQueue(message).then(() => 
    {
      console.log(`Sent to queue: ${JSON.stringify(message)}`)
      fs.appendFile(LOGFILE, `[PRODUCER] ${message.data}\n`, (err) => 
      {
        if (err) 
        {
          console.log(err)
        }
      })
    })
  })
})()


// app.ws('/heartbeat', (ws, req) => {
//   cron.schedule('*/5 * * * * *', () => {
//     const date  = new Date()
//     const message = `I'm alive at ${date}`
//     ws.send(message)
//     console.log('Sent to ws')
//     //sendToQueue(message)
//     console.log('Sent to queue')
//   })

//   cron.schedule('0 42 * * * *', () => {
//     ws.send('42 is the meaing of life')
//   })
// })

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })
