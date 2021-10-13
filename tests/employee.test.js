const Employee = require('../lib/employee');

describe('employeeClass', () => {
    it('should return a new Employee', () => {
        const name = "Doofus";
        const id = 2525;
        const email = "Email@Email.com";
        const employee = new Employee(name,id,email); 
      expect(employee.name).toEqual("Doofus");
      expect(employee.id).toEqual(2525);
      expect(employee.email).toEqual("Email@Email.com");
      expect(employee.getRole()).toEqual("Employee");
    });
});