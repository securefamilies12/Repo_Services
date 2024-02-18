const employeeSchema = require("../../modals/employee");

// class CreateEmployee {
//   async createEmployeeData(data) {
//     try {
//       const createEmployee = new employeeSchema({
//         first_name: data?.first_name,
//         last_name: data?.last_name,
//         mobile: data?.mobile_number,
//         designation: data?.designation,
//       });
  
//       await createEmployee.save();
//       return "Employee created successfully.";
//     } catch (e) {
//       let error = "";
//       if (e?.original?.sqlMessage) {
//         error = e.original.sqlMessage;
//       }
  
//       error = e?.message || e;
//       return error;
//     }
//   }
// }

async function createEmployeeData(data) {
  try {
    const createEmployee = new employeeSchema({
      first_name: data?.first_name,
      last_name: data?.last_name,
      mobile: data?.mobile_number,
      designation: data?.designation,
    });

    await createEmployee.save();
    return "Employee created successfully.";
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return error;
  }
}

async function getEmployeeByFirstName(first_name) {
  try {
    const employeeData = await employeeSchema.findOne({
      where: {
        first_name: first_name || "",
      },
    });

    return employeeData.dataValues;
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return error;
  }
}

async function updateEmployeeData(data) {
  try {
    const findEmployee = await employeeSchema.findOne({
      where: {
        first_name: data.first_name,
      },
    });

    if (!findEmployee) return { status: false, message: "Employee not found." };

    await findEmployee.update({
      last_name: data?.last_name,
      mobile: data?.mobile_number,
      designation: data?.designation,
    });

    return { status: true, message: "Updated Successfully" };
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return { status: false, message: error };
  }
}

async function deleteEmployeeData(first_name) {
  try {
    const findEmployee = await employeeSchema.findOne({
      where: {
        first_name: first_name,
      },
    });

    if (!findEmployee) return { status: false, message: "Employee not found." };

    await findEmployee.destroy();

    return { status: true, message: "Deleted Successfully" };
  } catch (e) {
    let error = "";
    if (e?.original?.sqlMessage) {
      error = e.original.sqlMessage;
    }

    error = e?.message || e;
    return { status: false, message: error };
  }
}

// const createEmployee = new CreateEmployee;

module.exports = {
  createEmployeeData,
  getEmployeeByFirstName,
  updateEmployeeData,
  deleteEmployeeData,
};