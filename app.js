const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const uri = 'mongodb+srv://node:auth1234@authcluster.5md6zwv.mongodb.net/node-auth?retryWrites=true&w=majority&appName=authCluster';
mongoose.connect(uri)
  .then((result) => {
    app.listen(3000, () => {
      console.log('server connected');
    })
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute);


//cookies
//create
app.get('/set-cookies', (req, res) => {
  // res.setHeader('set-cookie', 'newUser=true'); //normal method
  res.cookie('newUser', false) //by using cookie-parser
  res.cookie('isApple', true, {maxAge: 1000*60*60*24, secure: true})
  res.cookie('isOrange', true, {maxAge: 1000*60*60*24, httpOnly: true})
  res.send('you got a cookies!')
})

//read
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
})

