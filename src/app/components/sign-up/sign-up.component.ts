import { Component } from '@angular/core';
import { SignUpService, User } from '../../services/sign-up.service';
import { FormBuilderInput } from '../form-builder/form-builder.type';

interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public isLoading = false;
  public inputList: Array<FormBuilderInput> = [
    {
      keyName: 'firstName',
      label: 'First Name',
      validationList: { required: true,  max: 15 }
    },
    {
      keyName: 'lastName',
      label: 'Last Name',
      validationList: { required: true,  max: 15 }
    },
    {
      keyName: 'email',
      label: 'Email',
      validationList: { required: true, email: true }
    },
    {
      keyName: 'password',
      label: 'Password',
      validationList: { required: true, password: true, min: 8 }
    },
  ]

  constructor(private signUpService: SignUpService) { }

  public onSubmit(signup: Signup): void {
    this.isLoading = true;
    const user: User = {
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email
    }

    this.signUpService.createUser(user).subscribe(user => {
      this.isLoading = false;
    });
  }

}
