
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())
app.use(authenticate)

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body, req.user.email)
  await db.users.addChannel(req.user.email, channel.id, true)
  await Promise.all(channel.members.map((member) => {
    return db.users.addChannel(member, channel.id)
  }))
  res.status(201).json(channel)
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

app.put('/channels/:id/messages/:idMessage', async (req, res) => {
  const message = await db.messages.update(req.params.id, req.params.idMessage, req.body)
  res.status(201).json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body, req.user.email)
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const id =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  const user = await db.users.get(id)
  res.json(user)
})

app.get('/users/:id/channels', async (req, res) => {
  const id =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(id != req.user.email) throw Error('Unauthorized')
  const userChannels = await db.users.listChannels(id)
  res.json(userChannels)
})

app.put('/users/:id', async (req, res) => {
  const id =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(id != req.user.email) throw Error('Unauthorized')
  const user = await db.users.update(id, req.body)
  res.json(user)
})

app.get('/users/byname/:userName', async (req, res) => {
  const user = await db.users.getByName(req.params.userName)
  res.json(user)
})

app.post('/test/users', async (req, res) => {
   const users = await Promise.all(req.body.map(async (mockedUser) => {
    return new Promise(async (resolve, reject) => {
      try{
        const user = await db.users.create(mockedUser.user, mockedUser.email)
        resolve(user)
      }catch(err){
        reject(err)
      }
    })
  }))
  res.status(201).json(users)
})

module.exports = app
