import express from "express";
import { userModel } from "../../../Model/user.js";

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Please Provide All Required Fields",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
    status: false,
    statusCode: 500,
    message: "Intenal Server Error",
  });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email })
    if(!userExist){
      return res.status(400).json("User Not Found")
    }
    console.log(userExist, "exist")
    if(userExist && userExist?.password == password){
      return res.status(200).json(userExist)
    } else {
      return res.status(401).json({success: false, message: "Inavalid Credentials"})
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({success: false, message: error })
  }
})

router.get("/", async (req, res) => {
  try {
    const user = await userModel.find({});

    res.status(200).json({

      status: true,
      statusCode: 200,
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User Not Found",
      });
    } else {
      // json
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: user,
      });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findByIdAndUpdate(id,{
      $set: req.body
    },{
      new:  true
    })
    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User Not Found",
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User Not Found",
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

export default router;
