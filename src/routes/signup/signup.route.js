import { login } from "../../controller/signup/login.controller";
import { signup } from "../../controller/signup/signup.controller";

const express = require("express");
const router = express.Router();

class AllSignUpRoutes {
  static routes() {
    router.use("/signup", signup);
    router.use("/login", login);

    return router;
  }
}

export default AllSignUpRoutes.routes();
