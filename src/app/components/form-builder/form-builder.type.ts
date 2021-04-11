export type ValidationKey = 'required' | 'email' | 'password' | 'max' | 'min' | 'avoidFirstAndLastNameInPassword';

export type ValidationObject = { [v in ValidationKey]?: boolean | number };

export type ControlObject = {
  keyName: string;
  label: string;
  type: string,
  validationList: ValidationObject;
}

export type FormBuilderInput = {
  controls: Array<ControlObject>;
  generalValidation?: {
    avoidFirstAndLastNameInPassword?: {
      firstNameFieldKey: string;
      lastNameFieldKey: string;
      passwordFieldKey: string;
    }
  }
}
