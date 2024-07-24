const express = require("express");
const app = express();
const port = 8001;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://haidarcraft96:8XXlnaeA8iiQLNwN@cluster0.vbdutga.mongodb.net/merntest?retryWrites=true&w=majority&appName=Cluster0");

const UserModel = require("./models/Users");

app.get("/all-users", async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
});

// Create New User
app.post("/create-user", async (req, res) => {
    if (req.body.name != "" && req.body.age != "" && req.body.email != "") {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.json(req.body);
    }
});

// Delete Usesr
app.post("/delete-user", async (req, res) => {
    if (req.body.userID !== "") {
    await UserModel.findByIdAndDelete(req.body.userID);
    res.status(200);
    res.json("Successfully The User Is Deleted.");
    } else {
        res.json("The User Is Not Found.")
    }
});

app.listen(port, () => {
    console.log(`\n[!] Server Is Running: http://localhost:${port}`)
});
