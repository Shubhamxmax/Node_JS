const User = require("../models/user"); 

async function handleGetAllUsers(req, res){
                   const allDbUsers = await User.find({});
                   console.log(req.headers); // seeing request headers
                   res.setHeader("X-myName", "Piyush Garg"); // creating my own header
                   // Always add X to custom headers
    
                  return res.json(allDbUsers);
}

async function HandleGetUserbyId(req, res){
        const user = await User.findById(req.params.id);
    
        if (!user) return res.status(404).json({ error: "user not found" });
    
        return res.json(user);
}

async function HandleUpdateUserbyId(req, res){
          await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
      
          return res.json({ status: "Success" });
}

async function HandleDeleteUserbyId(req, res){
        await User.findByIdAndDelete(req.params.id);
    
        return res.json({ status: "Success" });
}

async function HandleCreateUserbyId(req, res){
        // TODO: Create new user
        const body = req.body;
        
        if(!body || !body.first_name ||!body.last_name ||!body.email ||!body.gender ||!body.job_title
        ){
            return res.status(400).json({ msg: "All fields are req..." });
        }
    
    const result =   await User.create({
              firstName: body.first_name,
              lastName: body.last_name,
              email:body.email,
              gender:body.gender,
              jobTitle: body.job_title
    
        })
    
        console.log(result)
    
       return res.status(201).json({msg: "success", id : result._id});
    
}

module.exports = {
    handleGetAllUsers,
    HandleGetUserbyId,
    HandleUpdateUserbyId,
    HandleDeleteUserbyId,
    HandleCreateUserbyId,
}