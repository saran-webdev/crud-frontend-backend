const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

/* DataBase Start */

// Connect to MongoDB
mongoose.connect("mongodb+srv://saran:lFiR98ER39i9YQl1@cluster0.6qaddc3.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// To check the database is connected to the backend
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Create a Schema for the collection
const crudSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  phoneNumber: String
});

// Create the Model
const CrudModel = mongoose.model("crud_table_backend", crudSchema);

/* DataBase End */

// Get All data
app.get("/", async (req, res) => {
  const data = await CrudModel.find();
  res.send(data);
});

// Post Register
app.post("/register", async (req, res) => {
  const { userName, password, email, phoneNumber } = req.body;
  console.log(req.body);
  const post_data = new CrudModel({
    userName,
    password,
    email,
    phoneNumber
  });

  await post_data.save();
  res.send("Data posted ");
});

// Post Login
app.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const user = await CrudModel.findOne({ userName });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // User is authenticated at this point
  res.json({ message: "Authentication successful" });
});

// Get Unique data by ID
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const find_one = await CrudModel.findById(id);
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
    await CrudModel.findByIdAndUpdate(id, { userName, email, phoneNumber });
    res.send("Data Updated");
  } catch (err) {
    res.send(err);
  }
});

// Delete data
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CrudModel.findByIdAndRemove(id);
    res.send("Data Deleted");
  } catch (err) {
    res.send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening at the PORT: ${PORT}`);
});


