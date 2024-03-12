const express = require("express");
const http = require("http");
import "dotenv/config";
import auth from "./config/auth";
const cors = require("cors");
const app = express();
import AllRoutes from "./routes/route";
import AllSignUpRoutes from "./routes/signup/signup.route";

// syntax app.method(path, function);
const httpServer = http.createServer(app);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// To Convert body data into json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// unauthenticated routes
app.use("/api/v1", AllSignUpRoutes);

// middleware
app.use(auth.authMiddleWare);

// authenticated routes
app.use("/api/v1", AllRoutes);

httpServer.listen({ port: process.env.PORT }, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT}`);
});
