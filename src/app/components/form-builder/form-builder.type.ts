export type ValidationKey = 'required' | 'email' | 'password' | 'max' | 'min';

export type ValidationObject = { [v in ValidationKey]?: boolean | number };

export type FormBuilderInput = {
  keyName: string;
  label: string;
  validationList: ValidationObject;
}
