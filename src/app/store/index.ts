import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { signUpReducer, SignUpState  } from './reducers/sign-up.reducer';


export interface State {
  signUpReducer: SignUpState
}

export const reducers: ActionReducerMap<State> = {
  signUpReducer: signUpReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
