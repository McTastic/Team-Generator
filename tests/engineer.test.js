const Engineer = require("../lib/engineer");

describe('engineerClass', () => {
    it('should return a new Engineer', () => {
        const name = "Fred";
        const id = 123;
        const email = "Fred@Fred.com";
        const github = "Freddy123";
        const employee = new Engineer(name,id,email,github); 
      expect(employee.name).toEqual("Fred");
      expect(employee.id).toEqual(123);
      expect(employee.email).toEqual("Fred@Fred.com");
      expect(employee.github).toEqual("Freddy123");
      expect(employee.getRole()).toEqual("Engineer");
    });
});