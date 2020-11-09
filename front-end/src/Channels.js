/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
    channels: {
        borderRight: '2px solid #a8b3b8',
        color : '#ffffff',
        minWidth: '200px'
    }
}

export default () => {
    return(
        <div css={styles.channels}>
        </div>
    )
}

