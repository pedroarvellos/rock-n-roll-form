import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  GeneralValidationObject,
  ValidationErrorsWithKnownKeys,
  ValidationKey,
  ValidationObject
} from '../form-builder.type';
import {
  EMAIL_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  UPPERCASE_AND_LOWERCASE_REGEX
} from './constraints.validation';

function regexValidation(control: AbstractControl, nameRegEx: RegExp, validation: ValidationKey, numeric?: number): { [p: string]: number | boolean } | null {
  if (!nameRegEx.test(control.value)) {
    return {[validation]: numeric ? numeric : true};
  }
  return null;
}

export function passwordMustNotHaveFirstAndLastName(firstName: string, lastName: string, password: string): (formGroup: any) => (ValidationErrors | null) {
  return (formGroup: any): ValidationErrors | null => {
    const passwordControl = formGroup.controls[password];

    const firstNameValue = String(formGroup.controls[firstName].value).toUpperCase();
    const lastNameValue = String(formGroup.controls[lastName].value).toUpperCase();
    const passwordValue = String(passwordControl.value).toUpperCase();

    // does not check if already found an error
    if (passwordControl.errors && !passwordControl.errors.mustMatch) {
      return null;
    }

    if (passwordValue.includes(firstNameValue) || passwordValue.includes(lastNameValue)) {
      passwordControl.setErrors({avoidFirstAndLastNameInPassword: true});
    } else {
      passwordControl.setErrors(null);
    }

    return null;
  };
}

export const getValidatorType = (validation: ValidationObject): Array<ValidatorFn> => {
  const validationErrorList: Array<ValidatorFn> = [];

  if (validation.required) {
    validationErrorList.push(Validators.required);
  }

  if (validation.max) {
    // closure's magic (◍•ᴗ•◍)❤
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(control, new RegExp(`^.{0,${validation.max}}$`),
        'max',
        validation.max as number)
    );
  }

  if (validation.min) {
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(
        control, new RegExp(`^.{${validation.min},}$`),
        'min',
        validation.min as number
      )
    );
  }

  if (validation.email) {
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(
        control,
        new RegExp(EMAIL_REGEX),
        'email'
      )
    );
  }

  if (validation.shouldContainUpperAndLowerCase) {
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(
        control,
        new RegExp(UPPERCASE_AND_LOWERCASE_REGEX),
        'shouldContainUpperAndLowerCase'
      )
    );
  }

  if (validation.shouldContainNumber) {
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(
        control,
        new RegExp(NUMBER_REGEX),
        'shouldContainNumber'
      )
    );
  }

  if (validation.shouldContainSpecialCharacter) {
    validationErrorList.push(
      (control: AbstractControl) => regexValidation(
        control,
        new RegExp(SPECIAL_CHARACTERS_REGEX),
        'shouldContainSpecialCharacter'
      )
    );
  }

  return validationErrorList;
};

export const getGeneralValidatorType = (generalValidation: GeneralValidationObject): Array<ValidatorFn> => {
  const generalValidationErrorsList: Array<ValidatorFn> = [];

  if (generalValidation.avoidFirstAndLastNameInPassword) {
    const {firstNameFieldKey, lastNameFieldKey, passwordFieldKey} = generalValidation.avoidFirstAndLastNameInPassword;
    generalValidationErrorsList.push(passwordMustNotHaveFirstAndLastName(firstNameFieldKey, lastNameFieldKey, passwordFieldKey));
  }

  return generalValidationErrorsList;
};

export const getValidatorErrorMessage = (validation: ValidationErrorsWithKnownKeys): Array<string> => {
  const validationErrorMessageList: Array<string> = [];

  if (validation.required) {
    validationErrorMessageList.push('Please, enter a value.');
  }

  if (validation.max) {
    validationErrorMessageList.push(`Please, enter max. ${validation.max} characters`);
  }

  if (validation.min) {
    validationErrorMessageList.push(`Please, enter at least ${validation.min} characters`);
  }

  if (validation.email) {
    validationErrorMessageList.push('Please, enter a valid email.');
  }

  if (validation.shouldContainUpperAndLowerCase) {
    validationErrorMessageList.push('Please, enter a value with uppercase and lowercase.');
  }

  if (validation.shouldContainNumber) {
    validationErrorMessageList.push('Please, enter a value with at least one number.');
  }

  if (validation.shouldContainSpecialCharacter) {
    validationErrorMessageList.push('Please, enter a value with at least one special character.');
  }

  if (validation.avoidFirstAndLastNameInPassword) {
    validationErrorMessageList.push('Please, avoid entering your first and last name.');
  }

  return validationErrorMessageList;
};
