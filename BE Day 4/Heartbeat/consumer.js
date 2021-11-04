require('dotenv').config()
const amqplib = require('amqplib')
const fs = require('fs')

const queue = process.env.QUEUE
const LOGFILE = process.env.LOGFILE

;(async () => {
  const client = await amqplib.connect('amqp://localhost:5672')
  const channel = await client.createChannel()
  await channel.assertQueue(queue)

  channel.consume(queue, (msg) => {
    // const data = Buffer.from(msg.content).toString()
    // console.log(`msg ${msg}`)
    // console.log(`msg.content ${msg.content}`)
    const content = JSON.parse(msg.content)
    // console.log(`data ${content.data}`)
    // console.log(data)
    //const data = JSON.parse(msg.content)
    // console.log(data)
    console.log(content.data)
    fs.appendFile(LOGFILE, `[CONSUMER] ${content.data}\n`, (err) => 
    {
      if (err) 
      {
        console.log('Error in writing log: ', err)
      }
      channel.ack(msg)
    })
  })
})()
