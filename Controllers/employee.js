
const Employees=require('../models/employee')
const db=require('../utils/database').db

exports.createEmployee = (req, res, next) => {
  const employeeData = {
    employee_id: req.body.employee_id,
    name: req.body.name,
    department: req.body.department,
  };
  const employeeContactDetail = {
    employee_id: req.body.employee_id,
    email: req.body.email,
    skype: req.body.skype,
    whatsapp: req.body.whatsapp,
    mobileno: req.body.mobileno
  };

  const employeeQuery = 'INSERT INTO employees SET ?';
  db.query(employeeQuery, employeeData, (error, results, fields) => {
    if (error) throw error;
    const contactQuery = 'INSERT INTO contact_details SET ?';
    db.query(contactQuery, employeeContactDetail, (error, results, fields) => {
      if (error) throw error;
      res.send('Data inserted successfully');
    });
  });
};

// Define a function to retrieve a paginated list of employees
exports.employeeList=(req,res,next)=>{
  const page = req.params.page || 1; // default to first page
  const perPage = req.params.perPage || 10; // default to 10 employees per page
  const offset = (page - 1) * perPage;

  const query = `
    SELECT *
    FROM employees
    JOIN contact_details ON employees.employee_id = contact_details.employee_id
    ORDER BY employees.employee_id
    LIMIT ${perPage} OFFSET ${offset};
  `;

  db.query(query, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
}

exports.readEmplyeesData=(req,res,next)=>{
  const employeeId = req.params.employee_id;
  const query = `
SELECT *
FROM employees
JOIN contact_details
ON employees.employee_id = contact_details.employee_id
WHERE employees.employee_id=?`;

db.query(query,[employeeId], (error, results, fields) => {
  if (error) throw error;
    console.log(error)
  console.log(results);
  res.send(results)
});
    
  };




  exports.updateEmployeesData = (req, res, next) => {
    const employeeId = req.params.employee_id;
    const updatedEmployeeData = {
      name: req.body.name,
      department: req.body.department,
    };
    const updatedEmployeeContactDetail = {
      email: req.body.email,
      skype: req.body.skype,
      whatsapp: req.body.whatsapp,
      mobileno: req.body.mobileno
    };
  
    const employeeQuery = 'UPDATE employees SET ? WHERE employee_id=?';
    db.query(employeeQuery, [updatedEmployeeData, employeeId], (error, results, fields) => {
      if (error) throw error;
  
      const contactQuery = 'UPDATE contact_details SET ? WHERE employee_id=?';
      db.query(contactQuery, [updatedEmployeeContactDetail, employeeId], (error, results, fields) => {
        if (error) throw error;
        res.send('Data updated successfully');
      });
    });
  };
  
exports.deleteEmployeesData=(req,res,next)=>{
  const employeeId = req.params.employee_id;
  const deleteContactQuery = 'DELETE FROM contact_details WHERE employee_id = ?';
  db.query(deleteContactQuery, employeeId, (error, results, fields) => {
    if (error) throw error;
    const deleteEmployeeQuery = 'DELETE FROM employees WHERE employee_id = ?';
    db.query(deleteEmployeeQuery, employeeId, (error, results, fields) => {
      if (error) throw error;
      res.send(`Employee with ID ${employeeId} has been deleted successfully.`);
    });
  });
}
