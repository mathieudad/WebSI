
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid author')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
  },
  users: {
    create: async (user, email) => {
      if(!user.name) throw Error('Invalid user')
      if(!email) throw Error('Invalid email')
      await db.put(`users:${email}`, JSON.stringify(user))
      await db.put(`userchannels:${email}`, JSON.stringify({owned: [], guest: []}))
      await db.put(`usernames:${user.name}`, email)
      return merge(user, {email: email})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      try{
        const data = await db.get(`users:${id}`)
        const user = JSON.parse(data)
        return merge(user, {id: id})
      }catch (err){
        //TODO Check error type
        return null
      }
    },
    getByName: async (userName) => {
      if(!userName) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    addChannel: async (id, idChannel, isAdmin) => {
      if(!id || !idChannel) throw Error('Invalid id')
      const data = await db.get(`userchannels:${id}`)
      let userChannels = JSON.parse(data)
      if(isAdmin){
        if(!userChannels.owned){
          userChannels.owned = []
        }
        userChannels.owned = [...userChannels.owned, `channels:${idChannel}`]
      }else{
        if(!userChannels.guest){
          userChannels.guest = []
        }
        userChannels.guest = [...userChannels.guest, `channels:${idChannel}`]
      }
      await db.put(`userchannels:${id}`, JSON.stringify(userChannels))
    },
    listChannels: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`userchannels:${id}`)
      const userChannels = JSON.parse(data)
      return userChannels
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
