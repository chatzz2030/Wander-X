const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "users.json");
const bookingsPath = path.join(__dirname, "bookings.json");

const app = express();

app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("WanderX backend running");
});

// LOGIN (auto register)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  }

  let user = users.find(u => u.email === email);

  if (user) {
    if (user.password === password) {
      return res.json({ success: true, user });
    }
    return res.json({ success: false, message: "Wrong password" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    name: email.split("@")[0]
  };

  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({ success: true, user: newUser });
});

// ✅ BOOKING ROUTE (FINAL)
app.post("/book", (req, res) => {
  const booking = req.body;

  if (!booking.email) {
    return res.json({ success: false, message: "Login required" });
  }

  let bookings = [];
  if (fs.existsSync(bookingsPath)) {
    bookings = JSON.parse(fs.readFileSync(bookingsPath, "utf-8"));
  }

  booking.id = Date.now();
  bookings.push(booking);

  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

  res.json({
    success: true,
    message: "Booking successful"
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
