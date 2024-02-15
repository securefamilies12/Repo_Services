const express = require("express");
const http = require("http");
const fs = require("fs");
const {
  createEmployeeData,
  getEmployeeByFirstName,
  updateEmployeeData,
  deleteEmployeeData,
} = require("./controller/employee/employee");
const cors = require("cors");
const PORT = 3000;

const app = express();

// http methods GET POST PUT DELETE

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

app.get("/get_employee", async (req, res) => {
  const { first_name } = req.query;
  const employeeData = await getEmployeeByFirstName(first_name);
  return res.status(200).json(employeeData);
});

// array () => {}
app.post("/create_employee", async (req, res) => {
  const data = req.body;

  const result = await createEmployeeData(data);

  return res.status(200).json(result);
});

app.put("/update_employee", async (req, res) => {
  const data = req.body;
  if (!data.first_name) {
    return res
      .status(200)
      .json({ status: false, message: "Employee Fist name sould required." });
  }
  const result = await updateEmployeeData(data);

  return res.status(200).json(result);
});

app.delete("/delete_employee", async (req, res) => {
  const { first_name } = req.query;
  if (!first_name) {
    return res
      .status(200)
      .json({ status: false, message: "Employee Fist name sould required." });
  }
  const result = await deleteEmployeeData(first_name);

  return res.status(200).json(result);
});

httpServer.listen({ port: PORT }, () => {
  console.log(`Hey we are connected... at ${PORT}`);
});
