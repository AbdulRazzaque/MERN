import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Stack } from '@mui/material';
import { Box, Container, Button} from '@mui/material';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import {useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import clogo from '../../images/clogo.jpg'
// import MaterialTable from '@material-table/core';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const Service = () => {
  const defaultMaterialTheme = createTheme();
  const [users, setUsers] = useState([])
  console.log(users)
  const   getAllUser=async()=> {
    try {
      const result = await axios.get("http://localhost:8000/getAllDoc")
      setUsers(result.data)

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

 
  useEffect(() => {
  getAllUser()
  }, [])

  let fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
 
        console.log(resp);

        if(resp+""=="undefined")
        {}else{
         var innerrows=resp.rows[0]
         var name=innerrows[0] 
         var email=innerrows[1] 
         var city=innerrows[2] 

         if(name=="name"&&email=="email"&&city=="city")
         {
          
          submitExcel(resp)
         }else{
          alert("invalid data")
         }
        }

       
        // this.setState({
        //   cols: resp.cols,
        //   rows: resp.rows
        // });
      }
    });

  }
  const submitExcel=async(resp)=>{
    try {
      const result = await axios.post("http://localhost:8000/saveData",{
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

  const   deleteUser=async(id)=> {
    try {
      console.log(users.name);
      const result = await axios.post("http://localhost:8000/deleteDoc",{
        id: id
      })
      getAllUser()
    } catch (error) {
      console.log(error);
    }
  }
  
  // const [getuserData, setuserData] = useState([])
  // const { id } = useParams("")
  const params = useParams("")
  const navigate =useNavigate()
  const viewData = async () => {
    alert('Hello')
    const res = await axios.get(`http://localhost:8000/getUser/${params.id}`)

    const data = await res.json()
    console.log(data);
    navigate("/view")

}
// var pdfdata=users
// console.log(pdfdata)
// for (let index = 0; index < pdfdata.length; index++) {
//   const element = pdfdata[index];
  
//   console.log(element.name)
// }


const pdfGenrater =()=>{
  var doc = new jsPDF('landscape','px','a4','false')
  doc.addImage(clogo,'jpg' ,65,20,200,200)
  doc.addPage()
  doc.setFont('Helvetica','bold')
  for (let index = 0; index < users.length; index++) {
    var sixty = 60*(index+1)
    var eighty = 60*(index+1)
    var hundred = 60*(index+1)
    doc.text(60,sixty,`Name`)
  doc.text(60,eighty,'E-mail')
  doc.text(60,hundred,'city')
  
  }
  // doc.text(60,60,'Name')
  // doc.text(60,80,'E-mail')
  // doc.text(60,100,'city')

  doc.setFont('Helvetica','normal')

  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    
    doc.text(100,sixty,`${element.name}`)
    doc.text(100,eighty,`${element.email}`)
    doc.text(100,hundred,`${element.city}`)
 
  
  }
  // doc.text(100,60,`name`)
  // doc.text(100,80,': email')
  // doc.text(100,100,': city')

  doc.save('a.pdf')
}
  return (
    <Box mt={5}>
    <Container >
    <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Non Export Field Preview"
      columns={[
       
        { title: 'Name', field: 'name', },
        { title: 'E-mail', field: 'email' },
        { title: 'city', field: 'city' },
     
        
    
      ]}
      actions={[
        {
          icon: 'visibility',
          tooltip: 'View',
          onClick:()=>{viewData()}
          // onClick: (event, rowData) => alert("You saved " + rowData.name)
          
        },
        {
          icon: 'edit',
          tooltip: 'Edit User',
          // onClick: (event, rowData) => alert("You saved " + rowData.name)
          
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick:()=>{deleteUser(users[0])}
          // onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
      ]}   
      // data={[
      //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      // ]}   

      data={users}  
      
      options={{
        exportButton: true,
        actionsColumnIndex: -1
      }}
  
 
    />
    </ThemeProvider>
  </Container>

  {/* <div>
   <h1>hell</h1>
   {
    users.map((item,index)=>{
      return(
        <div>
          {item.name}
        </div>
      )
    })
   }
    </div> */}
      
  <Box align='center' mt={3} >
  <Stack direction="row" spacing={2}  justifyContent='center'>
          <Button variant="contained" component="label" p={2} type="submit"  >
            Upload
            <input hidden multiple type="file" onChange={fileHandler.bind(this)} />
            <FileUploadIcon />
          </Button>
          <Button variant="contained" component="label" p={2}  onClick={pdfGenrater}>
            Export to pdf
          </Button>
          </Stack>
        </Box>
        
  </Box>

  )
}

export default Service