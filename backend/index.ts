import express from "express";
import passport from "passport";
import session from "express-session";
import usersRoutes from "./src/routes/userRoutes";

const app = express();

app.use(express.json());
app.use(
  session({
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

//MY ROUTES
app.use("/api/users", usersRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
