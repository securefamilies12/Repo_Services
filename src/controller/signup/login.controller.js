import md5 from "md5";
import jsonwebtoken from "jsonwebtoken";
import Users from "../../modals/signup/signup.modal";
import { Op } from "sequelize";

export const login = async (req, res) => {
  try {
    const { user_name, user_pass } = req.body;
    const userData = await Users.findOne({
      where: {
        user_email: user_name,
        user_pass: md5(user_pass),
        user_verify: 1,
        cp_status: 0,
      },
    });

    if (!userData) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Valid credentials required",
      });
    }

    if (userData.user_pass === md5(user_pass)) {
      req.userData = userData;
    }

    const token = jsonwebtoken.sign(
      {
        user_id: userData.user_id,
        user_name: userData.user_name,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "3600",
      }
    );

    const refreshToken = jsonwebtoken.sign(
      {
        user_id: userData.user_id,
        user_name: userData.user_name,
      },
      process.env.APP_SECRET,

      {
        expiresIn: "1d",
      }
    );

    return res.json({
      success: true,
      data: { token, refreshToken, user: userData?.dataValues || {} },
      message: "",
    });
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return res.status(400).json({ message: error, success: false });
  }
};
