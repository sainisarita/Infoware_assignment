const db=require('../utils/database').db
  const employeeTable= `
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INT NOT NULL AUTO_INCREMENT ,
      name VARCHAR(50) NOT NULL,
      department VARCHAR(50) NOT NULL,
      PRIMARY KEY(employee_id)
    )
  `;
  db.query(employeeTable, (err, result) => {
  if (err) {
    console.error('Error creating employees table: ', err);
    return;
  }
  else
  {
    console.log('Employees table created');
  }
})


//create the contact_details table
const contactDetail=`
    CREATE TABLE IF NOT EXISTS contact_details (
      employee_id INT PRIMARY KEY NOT NULL,
      email VARCHAR(50) NOT NULL,
      whatsapp VARCHAR(50) NOT NULL,
      skype VARCHAR(50) NOT NULL,
      mobileno VARCHAR(50) NOT NULL, 
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )
  `;
  db.query(contactDetail, (err, result) => {
  if (err) {
    console.error('Error creating employees table: ', err);
    return;
  }
  else
  {
    console.log('Employees table created');
  }
})
  

