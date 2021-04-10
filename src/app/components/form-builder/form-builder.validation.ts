import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ValidationKey, ValidationObject } from "./form-builder.type";

const EMAIL_REGEX = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])';

// closure's magic (◍•ᴗ•◍)❤
function regexValidation(control: AbstractControl, nameRegEx: RegExp, validation: ValidationKey, numeric?: number) {
  if (!nameRegEx.test(control.value)) {
    return { [validation]: numeric ? numeric : true };
  }
  return null;
}

export const getValidatorType = (validation: ValidationObject): Array<ValidatorFn> => {
    const validationErrorList: Array<ValidatorFn> = [];
    
    if(validation['required']) {
      validationErrorList.push(Validators.required);
    }

    if(validation['max']) {
      validationErrorList.push((control: AbstractControl) => regexValidation(control, new RegExp(`^.{0,${validation['max']}}$`), 'max', validation['max'] as number));
    }

    if(validation['min']) {
      validationErrorList.push((control: AbstractControl) => regexValidation(control, new RegExp(`^.{${validation['min']},}$`), 'min', validation['min'] as number));
    }
    
    if(validation['email']) {
      validationErrorList.push((control: AbstractControl) => regexValidation(control, new RegExp(EMAIL_REGEX), 'email'));
    }
    
    if(validation['password']) {
      validationErrorList.push((control: AbstractControl) => regexValidation(control, new RegExp(PASSWORD_REGEX), 'password'));
    }
    

    return validationErrorList;
}

export const getValidatorErrorMessage = (validation: ValidationErrors): Array<string> => {
    const validationErrorMessageList: Array<string> = [];
    
    if (validation['required']) {
      validationErrorMessageList.push('Please, enter a value.');
    }
    
    if (validation['max']) {
      validationErrorMessageList.push(`Please, enter max. ${validation['max']} characters`);
    }
    
    if (validation['min']) {
      validationErrorMessageList.push(`Please, enter at least ${validation['min']} characters`);
    }
    
    if (validation['email']) {
      validationErrorMessageList.push('Please, enter a valid email.');
    }
    
    if (validation['password']) {
      validationErrorMessageList.push('Please, enter a password with uppercase, lowercase, special characters and numbers.');
    }

    return validationErrorMessageList;
}
