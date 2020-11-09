/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
    footer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        color : '#ffffff',
        height: '30px',
        backgroundColor: '#a8b3b8',
        flexShrink: 0
    }
}

export default () => {
    return(
        <footer className="App-footer" style={styles.footer}>
            footer
        </footer>
    )
}

