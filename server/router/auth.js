const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");
const UserEmployer = require("../model/userSchemaEmployers");
const Authenticate = require("../middleware/authentication");
const Job = require("../model/jobPosting");
const transporter = require("../mail/mail");
const EmpAuthenticate = require("../middleware/EmployerAuthentication");
router.get("/", (req, res) => {
  res.send("Hello world from server router js");
});

// register new users
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(406).json({ error: "Plz fill the fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // yaha pe
      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log("error");
  }
});

// employee login
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      res.send(422).json({ error: "Plz fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        transporter.sendMail(
          {
            from: process.env.EMAIL,
            to: email,
            subject: "Login successfull",
            text: `Hi ${
              userLogin.name
            }, You have logged in successfully at ${new Date().toLocaleString()}`,
          },
          function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(201).json({ message: "User signIn successfull" });
      } else {
        res.status(422).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// employee profile
router.get("/about", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

// To fetch data of employee
router.get("/getData", Authenticate, (req, res) => {
  console.log("Fetching user data");
  res.send(req.rootUser);
});

// To log out a employee
router.get("/logout", Authenticate, async (req, res) => {
  const userId = req.rootUser._id;
  res.clearCookie("jwtoken");
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { tokens: { token: req.token } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error occurred during logout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UserEmployer register
router.post("/registerEmployer", async (req, res) => {
  const {
    name,
    email,
    phone,
    work,
    password,
    cpassword,
    companyInformation,
    contactInformation,
    companyAddress,
  } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(406)
      .json({ error: "Please fill in all the fields properly" });
  }

  try {
    const userExist = await UserEmployer.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const newUserEmployer = new UserEmployer({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
        companyInformation,
        contactInformation,
        companyAddress,
      });

      await newUserEmployer.save();

      res.status(201).json({ message: "UserEmployer registered successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UserEmployer login
router.post("/employerLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please provide email and password" });
    }

    const user = await UserEmployer.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Password" });
    }
    const token = await user.generateAuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    res.status(201).json({ message: "UserEmployer sign-in successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UserEmployer data
router.get("/employerData", EmpAuthenticate, (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
  console.log(req.rootUser);
});

// UserEmployer logout
router.get("/logoutEmp", EmpAuthenticate, async (req, res) => {
  const userId = req.rootUser._id;
  res.clearCookie("jwtoken");
  try {
    const user = await UserEmployer.findByIdAndUpdate(
      userId,
      { $pull: { tokens: { token: req.token } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error occurred during logout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/jobs", EmpAuthenticate, async (req, res) => {
  try {
    const data = req.body;
    const EmpId = req.rootUser._id;
    const EmpEmail = req.rootUser.email;

    const newJob = new Job({ ...data, EmpId, EmpEmail });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating job listing" });
  }
});

router.get("/jobs/employer", EmpAuthenticate, async (req, res) => {
  try {
    const id = req.userID;
    const jobs = await Job.find({ EmpId: id });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

// delete
router.delete("/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting job" });
  }
});

// update
router.put("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;
  const updatedJobData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(updatedJob); // Respond with the updated job data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating job" });
  }
});

module.exports = router;
