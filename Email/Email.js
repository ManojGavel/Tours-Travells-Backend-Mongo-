const nodemailer = require("nodemailer");
const sendEmail = async (options)=>{
    //1) Create a transpoter
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d32817f800f63f",
          pass: "26738b71c5d6b3",
        },
      });

    //2)Define the email options
    const mailOptions = {
        from:"Manoj <manoj@gmail.com>",
        to : options.email,
        subject:options.subject,
        text:options.message
    }

    //3) Acctuly send the email
    await transport.sendMail(mailOptions).then(e=>console.log("Success, email sent")).catch(e=>console.log("Error 💥 mail not send",e))
};
module.exports = sendEmail