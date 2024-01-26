import nodemailer from 'nodemailer'

  // async..await is not allowed in global scope, must use a wrapper
  export default async function sendEmail({email, tempToken}:{email:string, tempToken:number}) {
    const senderEmail = process.env.EMAIL_USER
    const senderPass = process.env.EMAIL_PASSWORD
    const emailHost = process.env.EMAIL_HOST 

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: 587,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: senderEmail,
        pass: senderPass,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: senderEmail, // sender address
      to: `${email}`, // list of receivers
      subject: "Your Login Code", // Subject line
      text: `Your login code is ${tempToken}`, // plain text body
    });
  }
  