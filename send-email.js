const sgMail = require("@sendgrid/mail");

const sendEmail = async (name, mobile, email, message, subject) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const html = `<h4> You have received a new email from a prospect/client </h4><div><b>NAME: </b> ${name}</div><div><b>EMAIL: </b> ${email}</div><div><b>MOBILE NUMBER: </b> ${mobile}</div><div><b>MESSAGE: </b> ${message}</div> `;
  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html
  };

  await sgMail.send(msg);
};

module.exports = sendEmail;
