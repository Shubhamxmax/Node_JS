const express = require("express");
const users = require("./MOCK_DATA.json"); // no export needed in .json file
const fs = require('fs')
const mongoose = require("mongoose")

const app = express();
const PORT = 5000;


//Connection

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log('Mongo Error'))

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobtitle: {
        type:String
    },
    gender: {
        type:String
    }

})

const User = mongoose.model("user", userSchema )



// // Routes

//SSR(Server Side Rendering):Sends html read-made page 
app.get("/users", (req, res) => {
  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
  res.send(html);
});

// // REST API
// //CSR(Client Side Rendering):Sends only json 
// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);

//   users.forEach(user => {
//     if (user.id === id) {
//       return res.json(user.first_name);
//     }
//   });
// });

// //SSR(Server Side Rendering):Sends html read-made page 
// app.get("/users", (req, res) => {
//   const html = `
//       <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//       </ul>
//     `;
//   res.send(html);
// });





// Part 2


//Middleware - Plugin

app.use(express.urlencoded({ extended: false})); 


app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `${Date.now()}: ${req.method}: ${req.path}\n`,
        (err) => {
            next();
        }
    );
});

app.use((req, res, next) =>{
    console.log("Hello from MiddleWare 3");
    // return res.json({msg: " Hello from Middleware 3"});
    next();
})


app.get("/api/users", (req, res) => {
    console.log(req.headers); // seeing request headers
    res.setHeader("X-myName", "Piyush Garg"); // creating my own header
    // Always add X to custom headers
    return res.json(users);
});

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
         const user = users.find((user) => user.id === id);

        if(!user)
            return res.status(404).json({error:"user not found"})


        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({ status: "Pending" });
    });

    app.post("/api/users", async (req, res) => {
    // TODO: Create new user
    const body = req.body;
    
    if(!body || 
        !body.first_name ||!body.last_name ||!body.email ||!body.gender ||!body.job_title
    ){
        return res.status(400).json({ msg: "All fields are req..." });
    }

const result =   await User.create({
          firstName: body.first_name,
          lastName: body.last_name,
          email:body.email,
          gender:body.gender,
          jobTitle: body.jobtitle

    })
    
    console.log(result)

   return res.status(201).json({msg: "success"});
 




    // users.push({...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // return res.status(201).json({ status: "pending" , id: users.length});
    // });


});



app.listen(PORT, () => {
  console.log("Server Started");
});
