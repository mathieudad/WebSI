
const {v4: uuid} = require('uuid') //utilisation de la syntaxe https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f
const {clone, merge} = require('mixme') //pareil. Ces fonctions permettent de d'éviter des problèmes de pointeurs...
//Création d'une "base de données" fake
const store =  {
  channels: {
  },
  users: {
  }
}
//Lignes à décommenter ici permettant d'utiliser level
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      store.channels[id] = channel
      channel.messages = {}
      //Ligne à décommenter en dessous pour avoir notre écriture en base de données
      //La clé en base de données seras sous la format channels:randomId (genere par la fonction uuid : https://fr.wikipedia.org/wiki/Universally_unique_identifier#:~:text=Universally%20unique%20identifier%20(UUID)%2C,information%20sans%20coordination%20centrale%20importante.
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      //Object.keys : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
      //à décommenter en dessous pour avoir notre lecture en base de données : https://github.com/Level/level#createReadStream
      /*      return new Promise( (resolve, reject) => {
      const channels = []
      db.createReadStream({
      gt: "channels:",
      lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
    }).on( 'data', ({key, value}) => {
    channel = JSON.parse(value)
    channel.id = key
    channels.push(channel)
  }).on( 'error', (err) => {
  reject(err)
}).on( 'end', () => {
resolve(channels)
})
})*/
},
update: (id, channel) => {
  const original = store.channels[id]
  if(!original) throw Error('Unregistered channel id')
  store.channels[id] = merge(original, channel) //à transformer pour avoir une modification dans la base de données
},
delete: (id, channel) => {
  const original = store.channels[id]
  if(!original) throw Error('Unregistered channel id')
  delete store.channels[id] //à transformer pour avoir une suppression en base de données : https://github.com/Level/level#del

}
},
users: {
  create: async (user) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
    if(!user.username) throw Error('Invalid user')
    const id = uuid()
    store.users[id] = user
    //Ligne à décommenter en dessous pour avoir notre écriture en base de données
    //La clé en base de données seras sous la format users:randomId (genere par la fonction uuid : https://fr.wikipedia.org/wiki/Universally_unique_identifier#:~:text=Universally%20unique%20identifier%20(UUID)%2C,information%20sans%20coordination%20centrale%20importante.
    // await db.put(`users:${id}`, JSON.stringify(user))
    return merge(user, {id: id})
  },
  list: async () => {
    //Object.keys : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys
    return Object.keys(store.users).map( (id) => {
      const user = clone(store.users[id])
      user.id = id
      return user
    })
    //à décommenter en dessous pour avoir notre lecture en base de données : https://github.com/Level/level#createReadStream
    /*      return new Promise( (resolve, reject) => {
    const users = []
    db.createReadStream({
    gt: "users:",
    lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
  }).on( 'data', ({key, value}) => {
  user = JSON.parse(value)
  user.id = key
  users.push(user)
}).on( 'error', (err) => {
reject(err)
}).on( 'end', () => {
resolve(users)
})
})*/
},
update: (id, user) => {
  const original = store.users[id]
  if(!original) throw Error('Unregistered user id')
  store.users[id] = merge(original, user) //à transformer pour avoir une modification dans la base de données
},
delete: (id, user) => {
  const original = store.users[id]
  if(!original) throw Error('Unregistered user id')
  delete store.users[id] //à transformer pour avoir une suppression en base de données : https://github.com/Level/level#del
}
},
messages: {
  list : async (id) => {
    return Object.keys(store.channels[id].messages).map( (id_message) => {
      const message = clone(store.channels[id].messages[id_message])
      message[id] = id_message
      return message
    })
  },
  create: async (content,id_channel) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
    if(!content) throw Error('Invalid content')
    const id = uuid()
    message = {
      creation: Date.now(),
      content: content
    }
    store.channels[id_channel].messages[id] = message
    //Ligne à décommenter en dessous pour avoir notre écriture en base de données
    //La clé en base de données seras sous la format channels:randomId (genere par la fonction uuid : https://fr.wikipedia.org/wiki/Universally_unique_identifier#:~:text=Universally%20unique%20identifier%20(UUID)%2C,information%20sans%20coordination%20centrale%20importante.
    // await db.put(`channels:${id}`, JSON.stringify(channel))
    return merge(message, {id: id})

  }
},
admin: {
  clear: async () => {
    store.channels = {}
    store.users = {}
    //ligne à décommenter pour effacer tous le contenu de la base de données level : https://github.com/Level/level#clear
    // await db.clear()
  }
}
}
