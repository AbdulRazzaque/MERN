import React from 'react'
import Box from '@mui/material/Box';
import {Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

const useStyles = makeStyles({
    headingColor:{
        backgroundColor:deepPurple[400],
        color:"white"
    }
})

const Home = () => {
    const classes = useStyles() 
  return (
    <>
     <Box textAlign="center" className={classes.headingColor} p={2}>
        <Typography variant='h2'>
            React Crud With api call
        </Typography>
     </Box>
    </>
  )
}

export default Home