const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Shore Koya <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      console.log('production');
      return nodemailer.createTransport({
        service: 'Brevo',
        host: process.env.SENDINBLUE_HOST,
        port: process.env.SENDINBLUE_PORT,
        auth: {
          user: process.env.SENDINBLUE_LOGIN,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // Add debug logs here
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log(
      'EMAIL_USERNAME:',
      process.env.EMAIL_USERNAME,
    );
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
    try {
      // 1. Render HTML based on a pug template
      const html = pug.renderFile(
        `${__dirname}/../views/email/${template}.pug`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
        },
      );

      // 2. Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };

      // 3. Create a transport and send email
      const result =
        await this.newTransport().sendMail(mailOptions);
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error; // Re-throw so calling code knows it failed
    }
  }

  async sendWelcome() {
    await this.send(
      'welcome',
      'Welcome to the Natours Family!',
    );
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
