import md5 from "md5";
import Users from "../../modals/signup/signup.modal.js";
import {
  encryptWithPublicKey,
  randomId,
} from "../../utils/autoGenerators.js";
import { sendMail } from "../../services/mail.service.js";
import UserSecurity from "../../modals/roles_collections/usersecurity.modal.js";
import moment from "moment";

export const signup = async (req, res) => {
  try {
    const { user_email, user_pass, user_fname, user_lname } = req.body;

    const user_name = encryptWithPublicKey(
      `SOF${randomId(6)}`
    );

    const email = await Users.findOne({
      where: {
        user_email: user_email,
      },
    });

    if (email) {
      new Error("Email already exists");
    }

    const hashedPassword = md5(user_pass);

    // const min = 1001;
    // const max = 2000;
    // const randomOtp = Math.floor(Math.random() * (max - min + 1)) + min;

    // nodemailer functionality
    await sendMail(user_email, user_key);

    new Error("Practice");

    const userData = await Users.create({
      user_name,
      user_email,
      user_pass: hashedPassword,
      user_fname,
      user_phone: "",
      user_lname,
      user_key: user_name,
    });

    await UserSecurity.create({
      user_id: userData.user_id || 0,
      Role_Coll: "SOF_RC_CUS_FREE",
      Str_Date: moment().format("YYYY-MM-DD"),
      End_Date: moment().add(6, "days").format("YYYY-MM-DD"),
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
