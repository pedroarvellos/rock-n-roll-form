import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ControlObject, FormBuilderInput, GeneralValidationObject, ValidationObject } from './form-builder.type';
import { getGeneralValidatorType, getValidatorErrorMessage, getValidatorType, passwordMustNotHaveFirstAndLastName } from './form-builder.validation';

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
    if(this.inputList) {
      let controls: {[key: string]: AbstractControl} = {};
      
      this.inputList?.controls.filter((input: ControlObject) => {
        controls = {... controls, ...{[input.keyName]: this.formBuilder.control('', this.getValidators(input.validationList ? input.validationList : null))}};
      });
  
      this.form = new FormGroup(controls, this.getGeneralValidators(this.inputList?.generalValidation ? this.inputList.generalValidation : null));
    }
  }

  private getGeneralValidators(generalValidationList: GeneralValidationObject | null) {
    let generalValidationErrorsList: Array<ValidatorFn> = [];

    if(generalValidationList) {
      generalValidationErrorsList = getGeneralValidatorType(generalValidationList);
    }

    return generalValidationErrorsList;
  }

  private getValidators(validationList: ValidationObject | null): Array<ValidatorFn> {
    let validationErrorsList: Array<ValidatorFn> = [];
    
    if(validationList) {
      validationErrorsList = getValidatorType(validationList);
    }

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
