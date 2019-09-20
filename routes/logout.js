const { check, validationResult } = require('express-validator');
const SessionSchema = require('../models/SessionSchema');

module.exports = app => {
  app.post(
    '/logout',
    [
      // Check and sanitize session token
      check('token')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .escape(),
    ],
    (req, res) => {
      // Check for errors form express-validator and send them back if there is any.
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(500).send({ success: false, errors: errors.array() });
      // Get needed information from request body.
      const { token } = req.body;

      // Find and delete token for database
      SessionSchema.findByIdAndDelete({ _id: token })
        .then(session => {
          if (!session)
            return res.status(500).send({
              success: false,
              errors: [{ msg: 'No session found for that token.' }]
            });
          if (session)
            return res
              .status(200)
              .send({ success: true, msg: 'Session successfully removed.' });
        })
        .catch(err => console.error(err));
    }
  );
};
