
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
  const userId =  Buffer.from(req.user.email, 'utf-8').toString('base64')
  const userChannels = await db.users.listChannels(userId)
  res.json(userChannels)
})

app.post('/channels', async (req, res) => {
  const idOwner =  Buffer.from(req.user.email, 'utf-8').toString('base64')
  const channel = await db.channels.create(req.body, idOwner)
  await db.users.addChannel(idOwner, channel.id)
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
  const channel = await db.channels.update(req.params.id, req.body)
  res.json(channel)
})

app.delete('/channels/:id', async (req, res) => {
  const channel = await db.channels.delete(req.params.id)
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

app.put('/channels/:id/messages/:messageId', async (req, res) => {
  const message = await db.messages.update(req.params.id, req.params.messageId, req.body)
  res.status(201).json(message)
})

app.delete('/channels/:id/messages/:messageId', async (req, res) => {
  try {
    const message = await db.messages.delete(req.params.id, req.params.messageId)
    res.status(200).json(message)
  } catch (err) {
    res.status(404)
    throw err
  }
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const id =  Buffer.from(req.user.email, 'utf-8').toString('base64')
  const user = await db.users.create(req.body, id)
  await db.settings.put(user.id, {mode: true, language: 'EN'})
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const user = await db.users.update(req.params.id, req.body)
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const channel = await db.users.delete(req.params.id)
  res.json(channel)
})

app.get('/users/:id/channels', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const userChannels = await db.users.listChannels(req.params.id)
  res.json(userChannels)
})

app.delete('/users/:id/channels/:idChannel', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const userChannels = await db.users.deleteChannel(req.params.id, req.params.idChannel)
  res.json(userChannels)
})

app.get('/users/byname/:userName', async (req, res) => {
  const user = await db.users.getByName(req.params.userName)
  res.json(user)
})

// Users settings
app.get('/users/:id/settings', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const user = await db.settings.get(req.params.id)
  res.json(user)
})

app.post('/users/:id/settings', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const settings = await db.settings.put(req.params.id, req.body)
  res.status(201).json(settings)
})

app.put('/users/:id/settings', async (req, res) => {
  const email =  Buffer.from(req.params.id, 'base64').toString('utf-8')
  if(email != req.user.email) throw Error('Unauthorized')
  const settings = await db.settings.put(req.params.id, req.body)
  res.status(201).json(settings)
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
