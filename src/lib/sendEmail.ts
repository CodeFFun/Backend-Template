import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "sanket.apply001@gmail.com",
      pass: "vnnp bchz izgz wwpz",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  export default async function sendEmail({email, tempToken}:{email:string, tempToken:number}) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'sanket.apply001@gmail.com', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Your login code is ${tempToken}`, // plain text body
    });
  }
  
