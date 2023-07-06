require('dotenv').config();
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/i-danDB';
const MONGODB_URI = process.env.MONGO_ATLATS_URI;

main().catch((err) => console.log(err));
async function main() {
   await mongoose.connect(MONGODB_URI);
}

// for storing session
const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: 'sessions',
});
//catch error while trying to store session
store.on('error', (err) => console.log(error));

const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');
const trendingRoutes = require('./routes/trending');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
   session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: store,
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRoutes);
app.use(homeRoutes);
app.use('/trending', trendingRoutes);

app.use((req, res) => {
   res.status(404).send('<h1>i-dan Says: 404</h1><h1>Page not found</h1>');
});

app.listen(process.env.PORT || 3000, () => {
   console.log('server started');
});
