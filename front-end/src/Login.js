import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';

const code_verifier = "IYPem8sttC_iPFxnYHhxM9_3ZaaQI5f_knXMxDhTYyc"
const url = "http://127.0.0.1:5556/dex/auth?client_id=example-app&scope=openid%20email%20offline_access&response_type=code&redirect_uri=http://127.0.0.1:3000&code_challenge=4U1pTg9soWY5hZeNv-vaL3Xc0s8WMAw98lHPLavKF_8&code_challenge_method=S256"

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  },
})

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div>
        <fieldset>
          <label htmlFor="username">username: </label>
          <input id="username" name="username" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">password:</label>
          <input id="password" name="password" type="password" />
        </fieldset>
        <fieldset>
          <input type="submit" value="login" onClick={ (e) => {
            e.stopPropagation()
            onUser({username: 'david'})
          }} />
        </fieldset>
        <a href={url}>Login</a>
      </div>
    </div>
  );
}
