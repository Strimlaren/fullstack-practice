import express from "express";

import passport from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple";

import usersRoutes from "./routes/userRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import authRoutes from "./routes/authenticationRoutes";

import "./strategies/localStrategy";

const app = express();
const PgSessionStore = pgSession(session);
require("dotenv").config();

app.use(express.json());
app.use(
  session({
    store: new PgSessionStore({
      conString: process.env.DB_CONNECTION_STRING,
      createTableIfMissing: true,
    }),
    secret: "seriousApp",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/campaigns", campaignRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}.`)
);
