const nodemailer = require("nodemailer");

const user = "ga6981892@gmail.com";
const pass = "wzajpqzosvyejnnb";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
  tls:{
    rejectUnauthorized:false
  }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log(confirmationCode,18)
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:9000/confirm/${confirmationCode} className="p-2 bg-green-500"> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
