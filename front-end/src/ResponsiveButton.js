import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



export function ResponsiveButton({name, props, icon}) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))
  

  props.size =  isSmallScreen ? "small" : "large"
  return (
    <Button {...props} startIcon = {icon}>
      {name}
    </Button>
  )
}

export function ResponsiveIconButton({props, icon}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  props.style = isSmallScreen ? {
    position: 'relative', 
    top: '32px',
    marginLeft : '3px'
  } : {
    position: 'relative', 
    top: '32px',
    marginLeft : '12px'
  }

  return (
    <IconButton {...props}>
      {icon}
    </IconButton>
  )
}
