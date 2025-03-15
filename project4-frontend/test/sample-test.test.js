import { expect } from 'chai';

// import the functions i want to test
// import validatePassword from '../src/components/SignUpViewComponent/SignUpViewComponent.vue'

function validatePassword(pw, cfmPw) {
    if (pw===cfmPw) {
        return true
    } else {
        return false
    }
}

describe("Tests For: validatePassword function", () => {
    it("should return true if password and confirmedPassword are the same", () => {
      const pw = "password123";
      const cfmPw = "password123";
      const result = validatePassword(pw,cfmPw);
      expect(result).to.be.true;
    });
  });