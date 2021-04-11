import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/services/sign-up.type';
import * as signUpActions from '../actions/sign-up.action';

export interface SignUpState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialSignUpState: SignUpState = {
  user: null,
  isLoading: false,
  error: null,
};

const reducer = createReducer(
  initialSignUpState,
  on(
    signUpActions.signup,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    signUpActions.signUpSuccess,
    (state, action: { user: User | null; }) => {
      return { ...state, isLoading: false, user: action.user };
    }
  ),
  on(
    signUpActions.signUpError,
    (state, error: { message: string; }) => {
      return { ...state, isLoading: false, error: error.message };
    }
  ),
  on(
    signUpActions.signUpAlertSuccess,
    state => state
  ),
  on(
    signUpActions.signUpAlertError,
    state => state
  )
);

export function signUpReducer(state: SignUpState | undefined, action: Action): SignUpState {
  return reducer(state, action);
}