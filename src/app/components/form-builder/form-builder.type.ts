export type ValidationKey = 'required' | 'email' | 'password' | 'max' | 'min';

export type ValidationObject = { [v in ValidationKey]?: boolean | number };

export type ControlObject = {
  keyName: string;
  label: string;
  type: string,
  validationList?: ValidationObject;
};

export type AvoidFirstAndLastNameInPassword = {
  firstNameFieldKey: string;
  lastNameFieldKey: string;
  passwordFieldKey: string;
};

// just as example if you want to enhance the general validators
export type CheckPasswordFields = {
  passwordFieldKey: string;
  confirmationFieldKey: string;
};

export type GeneralValidationObject = {
  avoidFirstAndLastNameInPassword?: AvoidFirstAndLastNameInPassword;
  checkPasswordFields?: CheckPasswordFields;
};

export type FormBuilderInput = {
  controls: Array<ControlObject>;
  generalValidation?: GeneralValidationObject;
};
