const Manager = require("../lib/manager");

describe('managerClass', () => {
    it('should return a new Manager', () => {
        const name = "Elon";
        const id = 777;
        const email = "Elon@Elon.com";
        const officeNumber = 101;
        const employee = new Manager(name,id,email,officeNumber); 
      expect(employee.name).toEqual("Elon");
      expect(employee.id).toEqual(777);
      expect(employee.email).toEqual("Elon@Elon.com");
      expect(employee.officeNumber).toEqual(101);
      expect(employee.getRole()).toEqual("Manager");
    });
});