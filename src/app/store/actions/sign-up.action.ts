import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/sign-up.type';

export const SIGN_UP = '[Signup] Sign Up User';
export const SIGN_UP_SUCCESS = '[Signup] Sign Up User Success';
export const SIGN_UP_ERROR = '[Signup] Sign Up User Error';
export const SIGN_UP_ALERT_SUCCESS = '[Signup] Signup Alert Success';
export const SIGN_UP_ALERT_ERROR = '[Signup] Signup Alert Error';

export const signup = createAction(
  SIGN_UP,
  props<{ user: User }>()
);

export const signUpSuccess = createAction(
  SIGN_UP_SUCCESS,
  props<{ user: User }>()
);

export const signUpError = createAction(
  SIGN_UP_ERROR,
  props<{ message: string }>()
);

export const signUpAlertSuccess = createAction(
  SIGN_UP_ALERT_SUCCESS,
  props<{ title: string; description: string }>()
);

export const signUpAlertError = createAction(
  SIGN_UP_ALERT_ERROR,
  props<{ title: string; description: string }>()
);
