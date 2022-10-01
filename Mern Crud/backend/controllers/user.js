import userModel from "../models/user.js";

class UserController {
  static getAllDoc = async(req, res) => {
    try {
      // const result = await userModel.find()
      const result = await userModel.find({isActive:true})
      res.send(result)
    
    } catch (error) {
      
    }
  };

  // insert data wiht ragister form 
  static register =async(req,res)=>{
    const {name,email,city}=req.body;
    try {
      const addUser = new userModel({
        name,
        email,
        city,
      })
      await addUser.save()
      res.status(201).json(addUser)
      console.log(addUser);
     
    
    } catch (error) {
      console.log(error);
    }
  }

  static deleteDoc =async(req,res)=>{
    try {
    
      var id=req.body.id
      const delteData = await  userModel.findByIdAndUpdate(id,{isActive:false})
     
      res.send(delteData)
     
    } catch (error) {
      console.log(error);
    }
  }

// get User information

static getUser=async(req,res)=>{
  try {
    // console.log(req.params)
    // res.send()
    const {id}=req.params
    const singleUser = await userModel.findById({_id:id})
    console.log(singleUser);
    res.status(201).json(singleUser)
  } catch (error) {
    res.status(402).json(error)
    console.log(error);
    
  }
}

  static saveData =async(req,res)=>{
    try {
      // var abc=[1,2,3]
      // abc.length
      var Ex=req.body.ExcelData
      // console.log(Ex.rows.length)
      // console.log("Ex.length")
    for(var a=0;a<Ex.rows.length;a++)
    {
      if(a!=0){
        var item=Ex.rows[a]
        var name=item[0]
        var email=item[1]
        var city=item[2]
     const exelData = new userModel ({    
          name:name,
          email:email,
          city:city,
          isActive:true
          
      
      })

      await exelData.save()
      }
    }
      res.send({data:""})
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
