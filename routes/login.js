const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const UserSchema = require('../models/UserSchema');
const SessionSchema = require('../models/SessionSchema');

module.exports = app => {
  app.post(
    '/login',
    [
      // Check and sanitize email
      check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail(),
      // Check and sanitize password
      check('password')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
    ],
    (req, res) => {
      // Check for errors from express-validator and send them back if there is any.
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(500).send({ success: false, errors: errors.array() });
      // Get needed information from request body.
      const { email, password } = req.body;

      // Check if user exsit in our system
      UserSchema.findOne({ email })
        .then(user => {
          // If no user is found send response with an error
          if (!user)
            return res.status(500).send({
              success: false,
              // eslint-disable-next-line prettier/prettier
              errors: [{ msg: 'Please check your username and password.' }]
            });
          // If user exist then check if passwords match and send response with error if they don't
          if (!bcrypt.compareSync(password, user.password))
            return res.status(500).send({
              success: false,
              // eslint-disable-next-line prettier/prettier
              errors: [{ msg: 'Please check your username and password.' }]
            });
          // If user exsit and passwords match create new user session
          const newUserSession = new SessionSchema();
          newUserSession.userID = user._id;
          newUserSession
            .save()
            .then(session =>
              res.status(200).send({ success: true, token: session._id })
            )
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  );
};
