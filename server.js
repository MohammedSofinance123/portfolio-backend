const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",  // Frontend origin
}));
app.use(express.json());

// Routes
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("API backend is running");
});
app.get('/healthz', (req, res) => {
    res.sendStatus(200);
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
