// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongooseConnect } = require('./config/keys');

// Create App & Set Port
const app = express();
const port = 5000 || process.env.PORT;

// Connect to mongoose database
mongoose
  .connect(mongooseConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to mongoose database.`))
  .catch(err => console.error(err));

// Setup middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// @type: POST
// @desc: Creates new user account
require('./routes/register')(app);

// @type: POST
// @desc: Login user and create usersession for verification.
require('./routes/login')(app);

// @type: POST
// @desc: Removes session from database using token.
require('./routes/logout')(app);

// @type: POST
// @desc: Checks if session token exist and is valid
require('./routes/validate')(app);

// Start app
app.listen(port, () => console.log(`Server running on port: ${port}`));
