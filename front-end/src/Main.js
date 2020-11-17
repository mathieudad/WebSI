import {useState} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Drawer from './Drawer'
import Channel from './Channel'


const styles = {
  main: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto'
  },
}

export default () => {
  const [channel, setChannel] = useState({name: "Channel 1"})
  const fetchChannel = async (channel) => {
    setChannel(channel)
  }
  return (
      <main css={styles.main}>
        <Drawer onChannel={fetchChannel}/>
        <Channel channel={channel} messages={[]} />
      </main>
  );
}
