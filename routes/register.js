const { check, validationResult } = require('express-validator');
const UserSchema = require('../models/UserSchema');

module.exports = app => {
  app.post(
    '/register',
    [
      // Check and sanitize username
      check('username')
        .trim()
        .not()
        .isEmpty()
        .escape(),
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
      const { username, email, password } = req.body;

      // Check to see if user is already in our system.
      UserSchema.findOne({ username, email })
        .then(result => {
          // If user is in our system send errors in response.
          if (result)
            return res.status(500).send({
              success: false,
              errors: [
                // eslint-disable-next-line prettier/prettier
                { msg: 'That username or email is already in our system.' }
              ],
            });
          // If no user is found then create new user.
          if (!result) {
            const newUser = new UserSchema();
            newUser.username = username;
            newUser.email = email;
            newUser.password = newUser.hashPassword(password);
            newUser
              .save()
              .then(() =>
                res.status(200).send({
                  success: true,
                  msg: `Thank you, ${username} you can now login.`,
                })
              )
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }
  );
};
