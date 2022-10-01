import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Stack } from '@mui/material';
import {Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { green } from '@mui/material/colors';


const useStyles = makeStyles({
    headingColor:{
        backgroundColor:green[400],
        color:"white"
    }
  })
const Edit = () => {
    const classes = useStyles() 
    const [inpval,setInp]=useState({
        name:'',
        email:'',
        city:''

    })

    const setData=(event)=>{
        console.log(event.target.value);
        const {name,value}=event.target
        setInp((preval)=>{
          return{
            ...preval,
            [name]:value
          }
        })
    }
  return (
    <>
    <Container>
    <Box mt={2}  >
    <Box textAlign="center" className={classes.headingColor} p={2}>
        <Typography variant='h6'>
            Edit Your Information
        </Typography>
     </Box>
     <Box mt={3}>
        <from >
        <Stack spacing={2} direction="row">
      <TextField fullWidth label="Name" onChange={setData}  value={inpval.name} name='name' id="fullWidth" />
      <TextField fullWidth label="Email" onChange={setData} value={inpval.email}  name='email' id="fullWidth" />
      <TextField fullWidth label="City" onChange={setData}  value={inpval.city} name='city' id="fullWidth" />
      </Stack>

        </from>
        </Box>
    </Box >
    <Box textAlign='center' mt={3}>
        
    <Button variant="contained" >
  Submit
</Button>
    </Box>
    </Container>
    </>
  )
}

export default Edit