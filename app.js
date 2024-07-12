const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

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