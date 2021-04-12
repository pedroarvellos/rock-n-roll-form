import { User } from 'src/app/services/sign-up.type';
import * as signUpActions from './sign-up.action';

const mockUser: User = {
    firstName: 'Thomas',
    lastName: 'Shelby',
    email: 'thomas@shelby.co.uk'
};

describe('SignUpActions', () => {
    
    it('should create signup action', () => {
        const action = signUpActions.signup({ user: mockUser });

        expect({ ...action }).toEqual({
            type: signUpActions.SIGN_UP,
            user: mockUser
        });
    });
    
    it('should create signUpSuccess action', () => {
        const action = signUpActions.signUpSuccess({ user: mockUser });
        
        expect({ ...action }).toEqual({
            type: signUpActions.SIGN_UP_SUCCESS,
            user: mockUser
        });
    });
    
    it('should create signUpError action', () => {
        const action = signUpActions.signUpError({ message: 'error' });
        
        expect({ ...action }).toEqual({
            type: signUpActions.SIGN_UP_ERROR,
            message: 'error'
        });
    });
    
    it('should create signUpAlertSuccess action', () => {
        const action = signUpActions.signUpAlertSuccess({ description: 'success description', title: 'success title' });
        
        expect({ ...action }).toEqual({
            type: signUpActions.SIGN_UP_ALERT_SUCCESS,
            description: 'success description',
            title: 'success title'
        });
    });
    
    it('should create signUpAlertError action', () => {
        const action = signUpActions.signUpAlertError({ description: 'error description', title: 'error title' });
        
        expect({ ...action }).toEqual({
            type: signUpActions.SIGN_UP_ALERT_ERROR,
            description: 'error description',
            title: 'error title'
        });
    });
});
