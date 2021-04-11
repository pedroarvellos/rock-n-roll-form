import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ControlObject, FormBuilderInput, ValidationObject } from './form-builder.type';
import { getValidatorErrorMessage, getValidatorType, passwordMustNotHaveFirstAndLastName } from './form-builder.validation';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input()
  public inputList: FormBuilderInput | null = null;
  @Input()
  public isLoading: boolean = false;
  @Output() 
  public submitForm: EventEmitter<any> = new EventEmitter;
  public form: FormGroup | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.form = null;
  }

  public ngOnInit(): void {
    const generalValidators = this.inputList?.generalValidation;
    let controls: {[key: string]: AbstractControl}  = {};
    this.inputList?.controls.filter((input: ControlObject) => {
      controls = {... controls, ...{[input.keyName]: this.formBuilder.control('', this.getValidator(input.validationList))}}
    })

    if(generalValidators?.avoidFirstAndLastNameInPassword) {
      this.form = this.formBuilder.group(controls, {
        validator: passwordMustNotHaveFirstAndLastName(generalValidators?.avoidFirstAndLastNameInPassword.firstNameFieldKey, generalValidators?.avoidFirstAndLastNameInPassword.lastNameFieldKey, generalValidators?.avoidFirstAndLastNameInPassword.passwordFieldKey)
      })
    } else {
      this.form = this.formBuilder.group(controls)
    }
  }

  private getValidator(validationList: ValidationObject): Array<ValidatorFn> {
    const validationErrorsList: ValidatorFn[] = getValidatorType(validationList);

    return validationErrorsList;
  }

  public getControl(controlName: string): AbstractControl | null {
    return this.form ? this.form.controls[controlName] : null; 
  }

  public getErrorMessage(keyName: string): Array<string> {
    const errorObject: ValidationErrors | null | undefined = this.getControl(keyName)?.errors;
    let validationErrorMessageList: Array<string> = [];
    
    if(errorObject) {
      validationErrorMessageList = getValidatorErrorMessage(errorObject);
    }

    return validationErrorMessageList;
  }

  public onSubmit(): void {
    this.submitForm.emit(this.form?.value);
    this.form?.reset();
  }
}
