import React from 'react';
import {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid } from '@material-ui/core';
import {ResponsiveButton} from './ResponsiveButton';
import beer from './icons/beer.svg';
import kitty from './icons/kitty.svg';
import masque from './icons/masque.svg';
import pet from './icons/pet.svg';
import snowM from './icons/planche-a-neige.svg';
import snowF from './icons/planche-a-neige-F.svg';




const DiagMessage = ({diagMess})=> {
    return(<DialogContentText style={{width: "85%"}}>{diagMess}</DialogContentText>)
}

const Image = ({image, number, handleSetNumber,onClose}) => {
    const style =({  
        width : '100px',
        heigh : '100px',
        borderRadius : '50%',
        border : '1px solid'
    })

    const onClickNumber = () => {
        handleSetNumber(number)
        onClose()
    }

    const props = {
        size : "small",
        variant: "contained",
        color:"secondary",
        onClick: onClickNumber
    }

    return(
        <div>
            <Grid 
        container
        direction="column"
        justify = "center"
        alignItems="center"
        >
        <Grid item xs>
        <img alt="avatar" src={image} css={style}/>
        </Grid>
        <Grid item xs>
        <ResponsiveButton name="upload" props={props} icon={<CloudUploadIcon/>}/>
        </Grid>
        </Grid>
        </div>
    )
}


export default ({open, onClose,handleSetNumber}) => {
    const [diagMess] = useState('Choose your favorite')

    const handleCancelDialog = () =>{
        onClose()
    }

    function FormRow1() {
        return (
        <React.Fragment>
            <Grid item xs={4} spacing={3}>
                <Image image={snowF} handleSetNumber={handleSetNumber} number={1} onClose={onClose}/>
            </Grid>
            <Grid item xs={4} spacing={3}>
                <Image image={snowM} handleSetNumber={handleSetNumber} number={2} onClose={onClose}/>
            </Grid>
            <Grid item xs={4} spacing={3} >
            <Image image={beer} handleSetNumber={handleSetNumber} number={3} onClose={onClose}/>
            </Grid>
        </React.Fragment>
        );
    }

    function FormRow2() {
        return (
        <React.Fragment>
            <Grid item xs={4} spacing={3} >
                <Image image={kitty} handleSetNumber={handleSetNumber} number={4} onClose={onClose}/>
            </Grid>
            <Grid item xs={4} spacing={3}>
                <Image image={pet} handleSetNumber={handleSetNumber} number={5} onClose={onClose}/>
            </Grid>
            <Grid item xs={4} spacing={3} >
            <Image image={masque} handleSetNumber={handleSetNumber} number={6} onClose={onClose}/>
            </Grid>
        </React.Fragment>
        );
    }

    return (<div>
        <Dialog open={open} fullWidth={true} maxWidth ={'lg'} >
        <DialogTitle id="form-dialog-title">Avatars</DialogTitle>
        <DialogContent>
        <DiagMessage diagMess = {diagMess}/>
        <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
            <FormRow1 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
            <FormRow2 />
        </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCancelDialog} color="primary">
            Cancel
        </Button>
        </DialogActions>
    </Dialog>
        </div>)

}