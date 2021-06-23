
export type ValidationKey = 'required' | 'email' | 'max' | 'min' | 'shouldContainUpperAndLowerCase' | 'shouldContainNumber' | 'shouldContainSpecialCharacter';

export type ValidationObject = { [v in ValidationKey]?: boolean | number };

export type ControlObject = {
  keyName: string;
  label: string;
  type: string,
  validationList?: ValidationObject;
};

export type GeneralValidationKey = 'avoidFirstAndLastNameInPassword';

export type AvoidFirstAndLastNameInPassword = {
  firstNameFieldKey: string;
  lastNameFieldKey: string;
  passwordFieldKey: string;
};

export type GeneralValidationObject = {
  avoidFirstAndLastNameInPassword?: AvoidFirstAndLastNameInPassword;
};

export type FormBuilderInput = {
  controls: Array<ControlObject>;
  generalValidation?: GeneralValidationObject;
};

export type ValidationErrorsWithKnownKeys = { [key in ValidationKey | GeneralValidationKey]?: any };
