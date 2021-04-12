import { signUpReducer, SignUpState } from "./sign-up.reducer";
import * as signUpActions from '../actions/sign-up.action';
import { User } from "src/app/services/sign-up.type";

const initialState: SignUpState = {
    user: null,
    isLoading: false,
    error: null,
};

const mockUser: User = { 
    firstName: 'Thomas',
    lastName: 'Shelby',
    email: 'thomas@shelby.co.uk'
};

describe('SignUpReducer', () => {
    
    it('should set is Loading to true on signup', () => {
        //given
        const action = signUpActions.signup({ user: mockUser });
        // when
        const newState: SignUpState = signUpReducer(initialState, action);
        //then
        expect(newState).toEqual({
            user: null,
            isLoading: true,
            error: null
        });
    });

    it('should set isLoading to false and user to user object on signup success', () => {
        //given
        const action = signUpActions.signUpSuccess({ user: mockUser });
        // when
        const newState: SignUpState = signUpReducer(initialState, action);
        //then
        expect(newState).toEqual({
            user: mockUser,
            isLoading: false,
            error: null
        });
    });

    it('should set isLoading to false and error to error message on signup error', () => {
        const message = 'error message';

        //given
        const action = signUpActions.signUpError({ message });
        // when
        const newState: SignUpState = signUpReducer(initialState, action);
        //then
        expect(newState).toEqual({
            user: null,
            isLoading: false,
            error: message
        });
    });
});
