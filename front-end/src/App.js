import {useState} from 'react'
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Footer from './Footer'
import Header from './Header'
import Drawer from './Drawer'
import Login from './Login'
import theme from './theme'
//material-ui
import {ThemeProvider} from '@material-ui/core/styles'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: '50px',
  },
}

export default () => {
  const [user, setUser] = useState(null)
  return (
    <div className="App" css={styles.root}>
        <Header />
        {
          user ? <Drawer /> : <Login onUser={setUser}/>
        }
        <Footer />
    </div>
  );
}
