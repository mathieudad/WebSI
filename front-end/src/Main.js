/** @jsx jsx */
import { jsx } from '@emotion/core'

import Channels from './Channels'
import Channel from './Channel'

const styles = {
    main: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#00aeeb',
        color : '#ffffff',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
    }
}



export default ({channel}) => {
    return(
        <main className="App-main" css={styles.main}>
            <Channels/>
            <Channel channel={channel}/>
        </main>
    )
}