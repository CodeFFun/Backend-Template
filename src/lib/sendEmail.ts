import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "api",
      pass: "63e4b591bad962b3b46acd353f14c2f4",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  export default async function sendEmail() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'no-reply@post.com', // sender address
      to: "sharmasanketa899@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }
  
