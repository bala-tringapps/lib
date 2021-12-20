const { Model } = require('sequelize');
const {sequelize,User} = require('../models');
const db = require('../models')



var addUser = async (req, resp) => {

    const {username, email, phoneNumber, password} = req.body;
    try{
    const insertData = await User.create({username, email, phoneNumber, password});
    return resp.status(200).json({"message":"registered sucessfully"});
    
    }
    catch(e)
    {
        return resp.status(500).json({"message": "try again"});
    }
}


var log = async(req, resp) =>{

     const {email,password} =req.body;
     try{
         const logdata = await User.findOne({where :{email:email} , attributes:{exclude:['createdAt','updatedAt']}});
         if(logdata){
             if(logdata.password === password){
               return resp.status(200).json({"message":"Login Successfull",logdata});
         
             }
             else{
                return resp.status(201).json({"message":"incorrect password "});
             }
         }
         else{
            return resp.status(202).json({"message":"user not found"});
         }
     }catch(e){
        
         return resp.status(501).json({"message": "error"});
     }
    }

    var getUser = async (req, resp) =>{
        const email= req.params.email;
        try{
            const data = await User.findOne( {where :{email:email}, attributes:{exclude:['password','createdAt','updatedAt']}})
            return resp.status(200).json(data);
        }catch(e){
            console.log(e)
            return resp.status(500).send(e);
        }
    }

    var updatefine = async (req, resp) =>{
        const UserId = req.params.UserId;
        const duedate = req.params.duedate;
        
       
        let newDate = new Date();
        const currentdate =  `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        try{     
            if(duedate<currentdate)
        {     
                
                
            var data = await User.findOne( {where :{UserId:UserId}, attributes:{exclude:['password','createdAt','updatedAt','username',' email','phoneNumber','UserId']}})
                const fineamt =50;
                var fine=0;
                fine=fine+data.fine;
                const datas= await db.sequelize.query(`UPDATE userinfo SET fine=${fine}+${fineamt} WHERE UserId = ${UserId}`);
                return resp.status(200).json(datas);
          
        }
        return resp.status(200).json("no fine");
            
        }catch(e){
            console.log(e)
            return resp.status(500).send(e);
        }
    }



module.exports = { addUser, log, getUser, updatefine}

