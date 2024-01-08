const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("./models/User.js");
const Booking = require("./models/Booking.js")
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "vcxnmcvneficxmkc29ea9328dm"

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(cors({
  credentials: true,
  origin: "http://127.0.0.1:5173",
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.token;
    if (!token) {
      reject(new JsonWebTokenError('JWT is missing'));
      return;
    }
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      type: false
    })
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // Set expiration to one month (in seconds)
      const expirationTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, { expiresIn: expirationTime }, (err, token) => {
        if (err) throw err;
        // Set the token as a cookie with an expiration time
        res.cookie("token", token, { maxAge: expirationTime * 1000, httpOnly: true, secure: true, sameSite: 'None' });
        res.json(userDoc);
      }
      );
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});


app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await User.findById(userData.id);

      if (!user) {
        console.error("User not found in the database");
        return res.status(401).json({ error: "User not found" });
      }

      res.json({ user });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie('token', { path: '/', httpOnly: true, secure: true, sameSite: 'None' });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







app.post("/new-booked", async (req, res) => {
  const { token } = req.cookies;
  const { vehicleType, serialNumber, garagiste, date, description } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const listingDoc = await Booking.create({
      user: userData.id,
      vehicleType,
      serialNumber,
      garagiste,
      Dateappointment: date,
      description,
      status: "pending"
    });
    res.json(listingDoc)
  });
})

app.get("/booking", async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/updated/:id", async (req, res) => {
  const { status } = req.query; // Use req.query to get parameters from the query string
  try {
    let booked = await Booking.findById(req.params.id);

    if (!booked) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booked.status = status;
    await booked.save();
    const updatedBookings = await Booking.find();
    res.json(updatedBookings);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new endpoint to get the count of users
app.get("/userCount", async (req, res) => {
  try {
    const userCount = await User.countDocuments({ type: false });
    res.json({ count: userCount });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/bookingByUser", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }))
})



app.listen(4000);