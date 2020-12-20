import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
// Local
import Context from './Context'
import { ResponsiveButton } from './ResponsiveButton'
import {
  useHistory
} from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { ReactComponent as DiscussionIcon } from './icons/discussion.svg';
import { Grid } from '@material-ui/core';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    icon: {
      width: '30%',
      fill: '#fff',
      marginBottom: '10px',
    }
  },
})

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }

  const propsLoginButton = {
    variant: "contained",
    color: "primary",
    onClick: redirect
  }

  return (

    <div css={styles.root}>
      <DiscussionIcon css={styles.icon} />

      <ResponsiveButton name='Login with OpenID Connect and OAuth2' props={propsLoginButton} icon={<LockOpenIcon />} />

    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const { setOauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const { id_token } = oauth
  const id_payload = id_token.split('.')[1]
  const { email } = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}


export default () => {
  const styles = useStyles(useTheme())
  const history = useHistory()
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { oauth, setOauth } = useContext(Context)
  const config = {
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if (!code) { // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    } else { // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  } else { // yes: we are coming from an oauth server
    const codeVerifier = cookies.code_verifier
    useEffect(() => {
      const fetch = async () => {
        try {
          const { data } = await axios.post(
            config.token_endpoint
            , qs.stringify({
              grant_type: 'authorization_code',
              client_id: `${config.client_id}`,
              code_verifier: `${codeVerifier}`,
              redirect_uri: `${config.redirect_uri}`,
              code: `${code}`,
            }))
          removeCookie('code_verifier')
          const email = JSON.parse(
            Buffer.from(
              data.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          ).email
          data.email = email
          const email64 = window.btoa(email)
          const res = await axios.get(`http://localhost:3001/users/${email64}`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`
            }
          })
          const user = res.data
          if (user) {
            data.user = user
            const settings = await axios.get(`http://localhost:3001/users/${email64}/settings`, {
              headers: {
                'Authorization': `Bearer ${data.access_token}`
              }
            })
            data.settings = settings.data
          }
          setOauth(data)
          // window.location = '/'
          history.push('/')
        } catch (err) {
          history.push('/Oups')
        }
      }
      fetch()
    })
    return (
      <div css={styles.root}>Loading tokens</div>
    )
  }
}
