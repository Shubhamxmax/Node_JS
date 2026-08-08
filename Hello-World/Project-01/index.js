const express = require("express");
const users = require("./MOCK_DATA.json"); // no export needed in .json file
const fs = require('fs')

const app = express();
const PORT = 5000;

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
    res.setHeader("myName", "Piyush Garg"); // creating my own header
    return res.json(users);
});

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);

        const user = users.find((user) => user.id === id);

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

    app.post("/api/users", (req, res) => {
    // TODO: Create new user
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending" , id: users.length});
});
});



app.listen(PORT, () => {
  console.log("Server Started");
});
