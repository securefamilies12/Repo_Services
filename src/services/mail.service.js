import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const sendMail = async (to, userKey) => {
  try {
    const emailUrl = `${process.env.NODE_API}sof/email_verify?randam=${userKey}&email=${to}&verify`;

    await transporter.sendMail({
      from: email,
      to: to,
      subject: "Request for verification - SOF",
      html: `<h2>Hello!</h2>
      <p>Please click the button below to verify your email address.</p>

      <a href=${emailUrl}>Verify Email Address </a>
      
      <p>If you did not create an account, no further action is required.</p><br>
      <h2>Regards,</h2>
      <p>Secure Our Familes</p>`,
    });

    return true;
  } catch (e) {
    return e;
  }
};
