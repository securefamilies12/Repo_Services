import Users from "../../modals/signup/signup.modal";

export const verify = async (req, res) => {
  try {
    const { email, random } = req.body;
    const userData = await Users.findOne({
      where: {
        user_email: email,
        user_key: random,
        user_verify: 0,
        cp_status: 1,
      },
    });

    if (!userData) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Valid credentials required",
      });
    }

    await userData.update({ user_verify: 1, cp_status: 0 });

    return res.json({
      success: true,
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
