import { login } from "../../controller/signup/login.controller";
import { signup } from "../../controller/signup/signup.controller";
import { verify } from "../../controller/signup/verify.controller";

const express = require("express");
const router = express.Router();

class AllSignUpRoutes {
  static routes() {
    router.use("/signup", signup);
    router.use("/login", login);
    router.use("/verify", verify);

    return router;
  }
}

export default AllSignUpRoutes.routes();
