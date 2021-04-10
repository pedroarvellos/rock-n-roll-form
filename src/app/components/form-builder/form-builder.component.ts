import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilderInput, ValidationObject } from './form-builder.type';
import { getValidatorErrorMessage, getValidatorType } from './form-builder.validation';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input()
  public inputList: Array<FormBuilderInput> = [];
  @Output() 
  public submit: EventEmitter<any> = new EventEmitter;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  public ngOnInit(): void {
    this.inputList.forEach(input => {
      this.form.addControl(input.keyName, this.formBuilder.control('', this.getValidator(input.validationList)));
    });
  }

  private getValidator(validationList: ValidationObject): Array<ValidatorFn> {
    const validationErrorsList: ValidatorFn[] = getValidatorType(validationList);

    return validationErrorsList;
  }

  public getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName]; 
  }

  public getErrorMessage(keyName: string): Array<string> {
    const errorObject: ValidationErrors | null = this.getControl(keyName).errors;
    let validationErrorMessageList: Array<string> = [];
    
    if(errorObject) {
      validationErrorMessageList = getValidatorErrorMessage(errorObject);
    }

    return validationErrorMessageList;
  }

  public onSubmit(): void {
    this.submit.emit(this.form.value);
    // this.form.reset()
  }
}
