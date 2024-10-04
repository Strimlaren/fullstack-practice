import express from "express";
import passport from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple";
import "./strategies/localStrategy";
import usersRoutes from "./routes/userRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import authRoutes from "./routes/authenticationRoutes";

const app = express();
const PgSessionStore = pgSession(session);

app.use(express.json());
app.use(
  session({
    store: new PgSessionStore({
      conString: process.env.DB_CONNECTION_STRING,
      createTableIfMissing: true,
    }),
    secret: "malmo-email",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/campaigns", campaignRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
