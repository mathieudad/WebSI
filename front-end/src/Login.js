import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import {Grid,Container, Button, Typography, TextField } from '@material-ui/core';

const useStyles = (theme) => ({
  container: {
    height: '100%',
    paddingTop: '10%'
  }
})

export default ({onUser}) => {
  const styles = useStyles(useTheme())

  return (
    <Container maxWidth="xs" css={styles.container}>
      <Typography color="primary" component="h1" variant="h5">
          Sign in
      </Typography>
      <form className="paper" noValidate onSubmit={onUser}>
        <TextField variant="outlined" color = "secondary" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
        <TextField variant="outlined" color = "secondary" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
        <Button type="submit" fullWidth variant="contained" color="secondary" className="submit">
          Sign In
        </Button>
      </form>
    </Container>
  );
}
