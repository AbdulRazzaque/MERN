import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Tooltip } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReactToPdf from "react-to-pdf";

const Details = () => {
    const { id } = useParams("")

    const [getuserData, setuserData] = useState([])

    console.log(getuserData)
    console.log(id);


    const getData = async () => {
        const res = await axios.get(`http://localhost:8000/getUser/${id}`)

        const data = res;
        console.log(data);
        setuserData(data.data)

    }

    useEffect(() => {
        getData()
    }, [])

    // pdf Cod 
    const ref = React.createRef();
    const options = {
      orientation: 'portrate',
      unit: 'in',
      // format: [4,2]
    };

    return (
        <div>
            <Container>
                <h1>Welcome Abdur</h1>

                <Card sx={{ maxWidth: 600 }} ref={ref}>
                    <CardContent>
                        <h3>Name: <span>{getuserData.name}</span></h3>
                        <h3><EmailIcon />Email: <span>{getuserData.email}</span></h3>
                        <h3>< LocationCityIcon /> <span>{getuserData.city}</span></h3>
                        <Tooltip title="Eidt"><Link to="edit"> <EditIcon className='icon' /> </Link></Tooltip>
                        <Tooltip title="Delete"><DeleteIcon className='icon' style={{ color: 'red' }} /></Tooltip>

                    </CardContent>
                </Card>
            </Container>
            <Box mt={5} align='center'>

              <ReactToPdf targetRef={ref} filename="Abdur.pdf" options={options} x={.5} y={.5} scale={0.8}>
                    {({ toPdf }) => (
                        <Button variant="contained"  onClick={toPdf}> <FileDownloadIcon />Export To PDF</Button>
                    )}
                </ReactToPdf>
                {/* <div style={{ width: 500, height: 500, background: 'blue' }} /> */}
               
            </Box>

   
        </div>
    )
}

export default Details