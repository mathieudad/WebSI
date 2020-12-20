import { useContext, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Context from './Context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ResponsiveButton } from './ResponsiveButton';
import Photo from './icons/photo.svg';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Avatar from './Avatar';
import md5 from 'md5';
import OurAvatarDialog from './OurAvatarsDialog';
import beer from './icons/beer.svg';
import kitty from './icons/kitty.svg';
import masque from './icons/masque.svg';
import pet from './icons/pet.svg';
import snowM from './icons/planche-a-neige.svg';
import snowF from './icons/planche-a-neige-F.svg';
import DropZone from './DropZone';

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    flex: '1 1 auto',
    display: 'flex',
    height: '100%'
  }
})

const Image = ({ image, theme }) => {
  //console.log(showImage(image))
  const style = ({
    width: '70px',
    heigh: '70px',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: theme.palette.secondary.light,
    marginBottom: '10px'
  })

  return <img alt="Welcome" src={image} css={style} />
}

//TODO : verifier la validité de l'username
export default () => {
  const history = useHistory()
  const theme = useTheme()
  const styles = useStyles(theme)
  const { oauth, setOauth } = useContext(Context)
  const [username, setUserName] = useState('')
  const [message, setMessage] = useState('please enter the username you want to use (you can change it later)')
  const [image, setImage] = useState(Photo)
  const [imageMessage, setImageMessage] = useState("Choose a way to add you an Avatar and look at the result below!")
  const [openAvatar, setOpenAvatar] = useState(false)
  const [openDZ, setOpenDZ] = useState(false)


  const handleChangeUsername = (event) => {
    setUserName(event.target.value)
  }


  const handleNewUser = async () => {
    if (!username || Object.is(image, Photo)) {
      if (!username) {
        setMessage('Ohoh it looks like you forgot to enter your username')
      }
      if (Object.is(image, Photo)) {
        setImageMessage('Ohoh it looks like you forgot to choose your avatar')
      }
    } else {
      try {
        const data = {
          name: username,
          avatar: image
        }
        const user = await axios.post('http://localhost:3001/users', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        oauth.user = user.data
        setOauth(oauth)
        history.push('/')
      } catch (err) {
        setMessage('Oops an error occur try again..')
      }
    }
  }

  const handleGravatar = async () => {
    const hashEmail = md5((oauth.email).toLowerCase())
    axios.get(`https://www.gravatar.com/avatar/${hashEmail}`, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        const buffer = Buffer.from(response.data, 'binary').toString('base64');
        setImage(`data:image/svg;base64,${buffer}`)
        setImageMessage('Wow... what a beautiful Gravatar')
      })
      .catch((err) => {
        setImageMessage('Oops an error with your gravatar occur please try again')
      })
  }

  const handleOurAvatar = () => {
    setOpenAvatar(true)
  }

  const handleCloseOurAvatar = () => {
    setOpenAvatar(false)
  }

  const handleDropZoneAvatar = () => {
    setOpenDZ(true)
  }

  const handleCloseDZ = () => {
    setOpenDZ(false)
  }

  const handleCase = (image) => {
    axios.get(image, {
      responseType: 'blob'
    })
      .then(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => {
          setImage(reader.result)
          setImageMessage('Wow... what a beautiful Avatar')
        }
      })
      .catch((err) => {
        setImageMessage('Oops an error with your gravatar occur please try again')
      })
  }

  const handleSetNumber = (number) => {
    switch (number) {
      case 1:
        handleCase(snowF)
        break;
      case 2:
        handleCase(snowM)
        break;
      case 3:
        handleCase(beer)
        break;
      case 4:
        handleCase(kitty)
        break;
      case 5:
        handleCase(pet)
        break;
      case 6:
        handleCase(masque)
        break;
      default:
        setImageMessage('Oops an error occur... try again')
    }
  }

  const handleSetImageDrop = (image) => {
    setImage(image)
    setImageMessage('Wow... what a beautiful Avatar')
  }

  const propsButton = {
    size: "large",
    variant: "contained",
    color: "primary",
    onClick: handleNewUser
  }

  return (
    <div css={styles.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography color="textPrimary" variant="h5">
          {message}
        </Typography>
        <div css={{ marginBottom: '20px' }}>
          <TextField
            autoFocus
            required
            variant="outlined"
            color="primary"
            id="name"
            label="username"
            margin="normal"
            onChange={handleChangeUsername}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </div>
        <Avatar HandleButton1={handleGravatar} HandleButton2={handleOurAvatar} HandleButton3={handleDropZoneAvatar} />
        <OurAvatarDialog open={openAvatar} onClose={handleCloseOurAvatar} handleSetNumber={handleSetNumber} aria-labelledby="form-dialog-title" />
        <DropZone open={openDZ} onClose={handleCloseDZ} setImage={handleSetImageDrop} />
        <Typography color="textPrimary" variant="h5">
          {imageMessage}
        </Typography>
        <Image image={image} theme={theme} />
        <ResponsiveButton name={'Send'} props={propsButton} />
      </Grid>
    </div>
  )
}