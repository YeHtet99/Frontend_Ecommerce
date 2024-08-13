const specialCharacterRegx = /[`!#$%^&*()+\-=[\]{};:"\\|<>/?~]/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const ChangePasswordValidation = (data, formMode) => {
  console.log("validattion",data)
    const err = {};
    const { confirm_password, new_password, current_password } = data;
  
    if (confirm_password === undefined || new_password === undefined || current_password === undefined) {
      err.passwordErr = "Fill The Information Successfully!";
    } else if ( 
      confirm_password?.length < 8 || new_password?.length < 8 || current_password?.length < 8 || 
      !passwordRegex.test(current_password) || !passwordRegex.test(confirm_password) || !passwordRegex.test(new_password)) {
      console.log("error",confirm_password,new_password,current_password)
      err.passwordErr = "Password must include Minimum eight characters, at least one letter, one number and one special character!";
    }else if(new_password !==  confirm_password){

      err.passwordErr = "New Password and Confirm Password must be same!";
    }
    return err;
  };