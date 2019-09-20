const { check, validationResult } = require('express-validator');
const SessionSchema = require('../models/SessionSchema');

module.exports = app => {
  app.post(
    '/validate',
    [
      check('token')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .escape(),
    ],
    (req, res) => {
      // Check for errors from express-validator and send them back if there is any.
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(500).send({ success: false, errors: errors.array() });
      // Get needed information from request body.
      const { token } = req.body;

      // Check and see if session exist in our database
      SessionSchema.findOne({ _id: token, isActive: true })
        .then(session => {
          // If no active session is found then send response with errors
          if (!session)
            return res.status(500).send({
              success: false,
              // eslint-disable-next-line prettier/prettier
              errors: [{ msg: 'No active sessions found for that token' }]
            });
          // If session does exist then return successfull response
          if (session)
            return res
              .status(200)
              .send({ success: true, msg: 'Session found and active' });
        })
        .catch(err => console.error(err));
    }
  );
};
