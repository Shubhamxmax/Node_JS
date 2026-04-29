const express = require("express");
const users = require("./MOCK_DATA.json"); // no export needed in .json file

const app = express();
const PORT = 5000;

// Routes

//SSR(Server Side Rendering):Sends html read-made page 
app.get("/users", (req, res) => {
  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
  res.send(html);
});

// REST API
//CSR(Client Side Rendering):Sends only json 
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users.forEach(user => {
    if (user.id === id) {
      return res.json(user.first_name);
    }
  });
});

//SSR(Server Side Rendering):Sends html read-made page 
app.get("/users", (req, res) => {
  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log("Server Started");
});
