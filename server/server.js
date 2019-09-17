// Express requirements
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import connection from "./config/conn";
import path from "path";
import forceDomain from "forcedomain";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";
import passport from "passport";
import {
  CategoryRoutes,
  ProductRoutes,
  CartRoutes,
  AuthRoutes,
  TrackRoutes,
  AddressRoutes,
  ShippingRoutes,
  UIRoutes,
  LookbookRoutes,
  CheckoutRoutes,
  OrderRoutes,
  VoucherRoutes,
  CollectionRoutes,
  v1Routes,
  SizingRoutes,
  InstagramRoutes
} from "./modules";
import session from "express-session";
import cors from "cors";
import passportSetup from "./config/passport-setup";
import keys from "./config/keys";
import uuidv4 from "uuid/v4";
import UAparser from "ua-parser-js";
import { ensureSession } from "./config/sessionCheck";
import sess from "express-mysql-session";
import csrf from 'csurf';
import fs from 'fs';

// // Our loader - this basically acts as the entry point for each page load
import loader from "./loader";


// const loader = {};
// if(process.env.NODE_ENV === 'production'){
//   loader = require('./loader');
// }

// SESSION
const MySQLStore = sess(session);
const optionSession = {
  host: keys.database.host,
  user: keys.database.user,
  password: keys.database.password,
  database: keys.database.database,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  schema: {
    tableName: "session",
    columnNames: {
      session_id: "id",
      expires: "expires",
      data: "data"
    }
  }
};

var sessionStore = new MySQLStore(optionSession);

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 5000;
let middleware = [ensureSession];








// Express Session
app.use(
  session({
    genid: function(req) {
      return uuidv4(); // use UUIDs for session IDs
    },
    name: keys.session.name,
    secret: keys.session.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: keys.session.maxAge, // satu hari,
      // sameSite: true
    }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(keys.session.secret));
app.disable("x-powered-by");

app.use(cors({ origin: keys.origin.url, credentials: true }));

// Compress, parse, log, and raid the cookie jar


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/v1/", [v1Routes]);
if(process.env.NODE_ENV === 'production'){
  app.use(compression());
  app.use(csrf());
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    res.status(403)
    res.send('INVALID TOKEN')
  })
}




app.use((req, res, next) => {

  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Frame-Options", "deny");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Access-Control-Allow-Origin", keys.origin.url);
  if (!keys.mode.active) {
    const urlNow = req.url.split("/");

    if (urlNow.length > 1 && urlNow[1] === 'api'){
      return res.json({ message: 'maintance' });
    }
  
  } 
  next();
});




app.use("/api/", middleware, [
  CategoryRoutes,
  ProductRoutes,
  CartRoutes,
  AuthRoutes,
  TrackRoutes,
  AddressRoutes,
  ShippingRoutes,
  UIRoutes,
  LookbookRoutes,
  CheckoutRoutes,
  OrderRoutes,
  VoucherRoutes,
  CollectionRoutes,
  SizingRoutes,
  InstagramRoutes
]);

app.use('/get/csrf',(req,res,next)=>{
  return res.send(req.csrfToken())
})



// Production Mode
if (process.env.NODE_ENV === "production") {

 // Set up homepage, static assets, and capture everything else

  app.use(express.Router().get("/", loader));
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.use(loader);

  // We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
  Loadable.preloadAll().then(() => {
    app.listen(PORT, console.log(`App listening on port ${PORT}!`));
  });
}

// Development Mode
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, console.log(`DEVELOPMENT App listening on port ${PORT}!`));
}

// Handle the bugs somehow
app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
