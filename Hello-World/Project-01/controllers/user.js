const User = require("../models/user"); 

async function handleGetAllUsers(req, res){
                   const allDbUsers = await User.find({});
                   console.log(req.headers); // seeing request headers
                   res.setHeader("X-myName", "Piyush Garg"); // creating my own header
                   // Always add X to custom headers
    
                  return res.json(allDbUsers);

}

module.exports = {
    handleGetAllUsers,
}