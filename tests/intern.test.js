const Intern = require('../lib/intern');

describe('internClass', () => {
    it('should return a new Intern', () => {
        const name = "Joe";
        const id = 999;
        const email = "Joe@Joe.com";
        const school = "UNC";
        const employee = new Intern(name,id,email,school); 
      expect(employee.name).toEqual("Joe");
      expect(employee.id).toEqual(999);
      expect(employee.email).toEqual("Joe@Joe.com");
      expect(employee.school).toEqual("UNC");
      expect(employee.getRole()).toEqual("Intern");
    });
});