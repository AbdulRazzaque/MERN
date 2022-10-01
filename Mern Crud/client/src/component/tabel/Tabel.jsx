import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './tabel.css'
import { jsPDF } from "jspdf";
import clogo from '../../images/clogo.jpg'
import { ThemeProvider, createTheme, Stack, TableSortLabel } from '@mui/material';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReactToPdf from "react-to-pdf";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

const Tabel = () => {
  // screen shot pdf code here 
  const ref = React.createRef();
  const options = {
    orientation: 'portrate',
    unit: 'in',
    // format: [4,2]
  };

  // Xl 
  const [getData, setData] = useState()
  let fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {

        console.log(resp);

        if (resp + "" == "undefined") { } else {
          var innerrows = resp.rows[0]
          var name = innerrows[0]
          var email = innerrows[1]
          var city = innerrows[2]

          if (name == "name" && email == "email" && city == "city") {

            submitExcel(resp)
          } else {
            alert("invalid data")
          }
        }
      }
    });
  }

  // Submit Excel data 
  const submitExcel = async (resp) => {
    try {
      const result = await axios.post("http://localhost:8000/saveData", {
        ExcelData: resp
      })
      // console.log("req.body.ExcelData--------------");
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
    // setData(resp)
    getAllUser()
  }

  // Get All user Data and show the tabel 
  const getAllUser = async () => {
    try {
      const result = await axios.get("http://localhost:8000/getAllDoc")
      setUsers(result.data)

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete tabel Recodes
  const deleteUser = async (id) => {
    try {
      const result = await axios.post("http://localhost:8000/deleteDoc", {
        id: id
      })
      getAllUser()
    } catch (error) {
      console.log(error);
    }
  }


  //Pdf

  const pdfGenrater = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false')
    doc.addImage(clogo, 'jpg', 65, 20, 200, 200)
    doc.addPage()
    doc.setFont('Helvetica', 'bold')
    for (let index = 0; index < users.length; index++) {
      // doc.addPage(index + 1)
    }
    doc.text(40, 40, 'Id')
    doc.text(80, 40, 'Name')
    doc.text(200, 40, 'E-amil')
    doc.text(350, 40, 'city')


    doc.setFont('Helvetica', 'normal')

    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      var sixty = 70 * (index + 1)
      doc.text(40, sixty, `${index + 1}`)
      doc.text(80, sixty, `${element.name}`)
      doc.text(200, sixty, `${element.email}`)
      doc.text(350, sixty, `${element.city}`)
    }
    doc.save('a.pdf')
  }

  // Show users Data 
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUser()
  }, [])


  // pagination 
  const [page, setPage] = useState(0)
  const [rowsPerPage, setrowsPerPag] = useState(5)
  const onPageChange = (event, nexPage) => {
    setPage(nexPage)
  }
  const onRowsPerPageChange = (event) => {
    setrowsPerPag(event.target.value)
  }

 

  return (
    <>
      <Container >
        <Box mt={2}>

          <TableContainer component={Paper}>
            <Table ref={ref}>
              <TableHead>
                <TableRow>

                  <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell>{key + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell > <Tooltip title="View"><Link to={`view/${user._id}`}><VisibilityIcon className='icon' style={{ color: 'green' }} /> </Link></Tooltip></TableCell>
                        <TableCell> <Tooltip title="Eidt"><Link to="edit"> <EditIcon className='icon' /> </Link></Tooltip></TableCell>
                        <TableCell ><Tooltip title="Delete"><DeleteIcon className='icon' style={{ color: 'red' }} onClick={() => { deleteUser(user._id) }} /></Tooltip></TableCell>
                      </TableRow>
                    )
                  })
                }

              </TableBody>
            </Table>
            <Box align='right'>
              <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                count={users.length}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                page={page}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </Box>
          </TableContainer>


        </Box>

        <Box align='center' mt={3}>
          {/* <Button variant="contained" component="label" p={2} type="submit" >
            Upload
            <input hidden multiple type="file" onChange={fileHandler.bind(this)} />
            <FileUploadIcon />
          </Button> */}
          <Stack direction="row" spacing={2} justifyContent='center'>
            <Button variant="contained" component="label" p={2} type="submit"  >
              Upload
              <input hidden multiple type="file" onChange={fileHandler.bind(this)} />
              <FileUploadIcon />
            </Button>
            <Button variant="contained" component="label" p={2} onClick={pdfGenrater}>
              Export to pdf
            </Button>
          </Stack>
        </Box>
        <Box align="right" >
          <Link to="ragister"><Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab></Link>
        </Box>
      </Container>
      {/* 
<div>
    <ReactToPdf targetRef={ref} filename="Abdur.pdf" options={options} x={.5} y={.5} scale={0.8}>
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </ReactToPdf>
    <div style={{width: 500, height: 500, background: 'blue'}} />
</div> */}
      {/* <input type="file" onChange={fileHandler.bind(this)} style={{"padding":"10px"}} /> */}
    </>
  )
}

export default Tabel