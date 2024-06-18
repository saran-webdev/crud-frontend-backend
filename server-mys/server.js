const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

/* DataBase Start */
const { Sequelize } = require("sequelize");

// DataBase Credentials
const sequelize = new Sequelize(
  `mysql-crud`,
  "santhanakrishnan",
  "Askrrdc@#$sql1",
  {
    dialect: "mysql"
  }
);

// To check the database is connected to the backend
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectToDatabase();

// variable name and table name both are same
const crud_table_backend = sequelize.define("crud_table_backend", {
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  phoneNumber: Sequelize.STRING
});

// Create the table
(async () => {
  await sequelize.sync();
  console.log("Table created successfully");
})();

/* DataBase End */

// Post
app.post("/", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const post_data = crud_table_backend.build({
    userName,
    password: hashedPassword,
    email,
    phoneNumber
  });
  await post_data.save();
  res.send("Data posted ");
});

// Post for Login
app.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const user = await crud_table_backend.findOne({ where: { userName } });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Compare hashed password with plain password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // User is authenticated at this point
  res.json({ message: "Authentication successful" });
});

// Get All data
app.get("/", async (req, res) => {
  const data = await crud_table_backend.findAll();
  res.send(data);
});

// Get Unique data by ID
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const find_one = await crud_table_backend.findOne({
      where: { id }
    });
    res.send(find_one);
  } catch (err) {
    res.send(err);
  }
});

// Update data
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { userName, email, phoneNumber } = req.body;
  try {
    const update_data = await crud_table_backend.update({userName, email, phoneNumber}, {
      where: { id }
    });
    res.send("Data Updated");
    // res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});

// Delete data
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const delete_data = await crud_table_backend.destroy({
      where: { id }
    });
    res.send("Data Deleted");
    // res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening at the PORT: ${PORT}`);
});
