import {useState} from 'react'
import './App.css'
import axios from 'axios'
import qs from 'qs'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default () => {
  const [user, setUser] = useState(null)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const handleLogin = async ({
    params: { client_id, client_secret, refresh_token, token_endpoint },
    stdout,
    stderr
  }) => {
    const {data} = await axios.post(token_endpoint,qs.stringify('refresh_token', client_id, client_secret, refresh_token))
                            .then(() => {
                                stdout.write(JSON.stringify(data, null, 2))
                                stdout.write('\n\n')
                              })
                              .catch( (err) => {
                                stderr.write(JSON.stringify(err.response.data, null, 2))
                                stderr.write('\n\n')
                              })  
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      {
        user ? <Main drawerMobileVisible={drawerMobileVisible} /> : <Login onUser={handleLogin} />
      }
      <Footer />
    </div>
  );
}
