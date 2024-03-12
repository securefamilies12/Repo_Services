import md5 from "md5";
import Users from "../../modals/signup/signup.modal.js";
import { generateRandomHex } from "../../utils/autoGenerators.js";
import { sendMail } from "../../services/mail.service.js";

export const signup = async (req, res) => {
  try {
    const { user_name, user_email, user_pass, user_fname, user_lname } =
      req.body;

    console.log(req.body);

    const email = await Users.findOne({
      where: {
        user_email: user_email,
      },
    });

    if (email) {
      new Error("Email already exists");
    }

    const hashedPassword = md5(user_pass);
    const user_key = "SOF" + generateRandomHex(3);

    // const min = 1001;
    // const max = 2000;
    // const randomOtp = Math.floor(Math.random() * (max - min + 1)) + min;

    // nodemailer functionality
    await sendMail(user_email, user_key);

    await Users.create({
      user_name,
      user_email,
      user_pass: hashedPassword,
      user_fname,
      user_phone: 9000718860,
      user_lname,
      user_key,
    });

    return res.status(200).json({
      result: {
        status: 200,
        success: true,
        message:
          "User signup successfull. Please check your mail to verify your account",
      },
    });
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return res.status(400).json({ result: { message: error, success: false } });
  }
};
