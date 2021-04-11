import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/sign-up.type';
import { getSignUpStatus } from 'src/app/store/selectors/sign-up.selectors';
import * as signUpActions from '../../store/actions/sign-up.action';
import { FormBuilderInput } from '../form-builder/form-builder.type';
import { Signup } from './sign-up.type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public isLoading$: Observable<boolean>;
  public inputList: FormBuilderInput = {
    controls: [
      {
        keyName: 'firstName',
        label: 'First Name',
        type: 'text',
        validationList: { required: true,  max: 15 }
      },
      {
        keyName: 'lastName',
        label: 'Last Name',
        type: 'text',
        validationList: { required: true,  max: 15 }
      },
      {
        keyName: 'email',
        label: 'Email',
        type: 'text',
        validationList: { required: true, email: true }
      },
      {
        keyName: 'password',
        label: 'Password',
        type: 'password',
        validationList: { required: true, password: true, min: 8 }
      },
    ],
    generalValidation: {
      avoidFirstAndLastNameInPassword: {
        firstNameFieldKey: 'firstName',
        lastNameFieldKey: 'lastName',
        passwordFieldKey: 'password',
      }
    }
  }

  constructor(private readonly store: Store) {
    this.isLoading$ = this.store.select(getSignUpStatus);
  }

  public onSubmit(signup: Signup): void {
    const user: User = {
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email
    }
    
    this.store.dispatch(signUpActions.signup({ user }));
  }
}
