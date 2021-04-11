import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SignUpService } from 'src/app/services/sign-up.service';
import * as signUpActions from '../actions/sign-up.action';

@Injectable()
export class SignUpEffects {
  public signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.SIGN_UP),
      mergeMap(({ user }) => this.signUpService.signUp(user).pipe(
        //This api is returning null, so that's why I'm saving the sent user.
        switchMap(() => {
          return [
            signUpActions.signUpSuccess({ user }),
            signUpActions.signUpAlertSuccess({ title: 'Success', description: 'User created successfully!' })
          ]
        }),
        catchError(() => {
          return of(
            signUpActions.signUpError({ message: 'It was not possible to create user!' }),
            signUpActions.signUpAlertError({ title: 'Error', description: 'It was not possible to create user!' })
          )
        })
      ))
    )
  )

  public displaySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.SIGN_UP_ALERT_SUCCESS),
      tap(({ title, description }) => {
        this.toastr.success(description, title);
      })
    ),
    { dispatch: false }
  );

  public displayError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.SIGN_UP_ALERT_ERROR),
      tap(({ title, description }) => {
        this.toastr.error(description, title);
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private signUpService: SignUpService, private toastr: ToastrService) { }
}
