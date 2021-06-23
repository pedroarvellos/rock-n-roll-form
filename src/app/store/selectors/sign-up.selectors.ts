import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignUpState } from '../reducers/sign-up.reducer';

export const getSignUpState = createFeatureSelector<SignUpState | undefined>('signUpReducer');

export const getSignUpStatus = createSelector(
  getSignUpState,
  (signUpState: SignUpState | undefined): boolean => signUpState ? signUpState.isLoading : false
);
