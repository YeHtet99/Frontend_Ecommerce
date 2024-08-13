
const specialCharacterRegx = /[`!#$%^&*()+\-=[\]{};:"\\|<>/?~]/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

export const LoginFormValidation = ({ email, password }) => {
  const err = {};
  if (email === "" || !email) {
    err.userErr = "Email can't be empty!";
  } else if (!emailRegex.test(email)) {
    err.userErr = "Invalid email address!";
  } else if (password === "") {
    err.passwordErr = "Password can't be empty!";
  }
  return err;
};

export const RegisterFormValidation = (userName,email,password) => {
    const err = {};
   
    if (userName === "") {
      err.userNameErr = "Fill User Name!";
    } else if (email === "" || email === "") {
      err.emailErr = "Fill Email!";
    } else if (!emailRegex.test(email || email)) {
      err.emailErr = `Invalid email address! ${email || email}`;
    } else if (password === null) {
      return err;
    } else if (password === "") {
      err.passwordErr = "Fill Password!";
    } else if (password.length < 8) {
      err.passwordErr = "Password must include Minimum eight characters, at least one letter, one number and one special character";
    }
    
    return err;
  };