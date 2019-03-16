var mongoose = require('mongoose');
var User = mongoose.model('User');
require('dotenv').config();
var crypto = require('crypto');

const nodemailer = require('nodemailer');

module.exports = app => {
  app.post('/forgotPassword', (req, res, next) => {
    if (req.body.email === '') {
      res.status(400).send('Sorry email is required');
    }
    console.log(req.body.email);
    User.findOne({email: req.body.email}, (err, user) => {
      const resetToken = crypto.randomBytes(20).toString('hex');

      if (user === null) {
          res.status(400).send('That email is not registered, please try again or register');
      } else {
        try{
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpires = Date.now() + 3600000;
          user.save();
        } catch (err) {
          console.error('there was an error: ', err);
          res.status(400).send('Sorry something went wrong, please try again later');
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.RESET_PASSWORD_EMAIL_ADDRESS}`,
            pass: `${process.env.RESET_PASSWORD_EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: `support@satsumaspoon.com`,
          to: `${user.email}`,
          subject: `SatsumaSpoon Reset Password`,
          text:
            `You received this email because we got a request to reset your password.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process.\n\n` +
            `This link will expire within one hour of being sent:\n\n` +
            `${process.env.RESET_PASSWORD_PATH}/reset/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, function(err, response) {
          if (err) {
            console.error('there was an error: ', err);
            res.status(400).send('Sorry something went wrong, please try again later');
          } else {
            console.log('here is the res: ', response);
            res.status(200).send('Recovery email sent');
          }
        });
      }
    });
  });
};
