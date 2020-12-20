import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Context = React.createContext()

export default Context

export const Provider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)

  return (
    <Context.Provider value={{
      oauth: oauth,
      setOauth: (oauth) => {
        if (oauth) {
          if (oauth.user && !oauth.user.avatar)
            setCookie('oauth', oauth)
          else if (oauth.user) {
            let copy = JSON.parse(JSON.stringify(oauth))
            delete copy.user.avatar
            setCookie('oauth', copy)
          }
        } else {
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
      channels: channels,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setChannels: setChannels,
      currentChannel: currentChannel,
      setCurrentChannel: (channelId) => {
        const channel = channels.find(channel => channel.id === channelId)
        setCurrentChannel(channel)
      },
    }}>{children}</Context.Provider>
  )
}
