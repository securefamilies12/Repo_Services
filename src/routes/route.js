const express = require("express");

const router = express.Router();
class AllRoutes {
  static routes() {
    router.use("/profile", () => {});

    router.use("/admin", () => {});

    router.use("*", async (req, res) => {
      return res.status(500).json({
        result: {
          success: false,
          message: "The requested page not found.",
        },
        data: "",
      });
    });
    return router;
  }
}

export default AllRoutes.routes();
