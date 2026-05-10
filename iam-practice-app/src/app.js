require("dotenv").config({ quiet: true });

const express = require("express");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const scimRoutes = require("./routes/scimRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: ["application/json", "application/scim+json"] }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "identitycore-phase-1-local-training-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

app.use(authRoutes);
app.use(pageRoutes);
app.use("/api", apiRoutes);
app.use("/scim/v2", scimRoutes);

app.listen(port, () => {
  console.log(`IdentityCore IAM Practice App listening at http://localhost:${port}`);
});
