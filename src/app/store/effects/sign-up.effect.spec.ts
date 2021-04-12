import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { User } from 'src/app/services/sign-up.type';
import { SignUpService } from '../../services/sign-up.service';
import * as signUpActions from '../actions/sign-up.action';
import { SignUpState } from '../reducers/sign-up.reducer';
import { SignUpEffects } from './sign-up.effects';

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

class MockSignUpService {
    signUp() {
        return of(null);
    }
}

class MockToastrService {
    success(description: string, title: string) {
        return of(null);
    }
    
    error(description: string, title: string) {
        return of(null);
    }
}

describe('SignUpEffects', () => {
    let actions$: Observable<any>;
    let effects: SignUpEffects;
    let store: MockStore<SignUpState>;
    let httpService: SignUpService;
    let toastrService: ToastrService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ToastrModule.forRoot({
                    positionClass: 'toast-top-center'
                })
            ],
            providers: [
                SignUpEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: SignUpService, useClass: MockSignUpService },
                { provide: ToastrService, useClass: MockToastrService },
            ],
        });

        effects = TestBed.inject(SignUpEffects);
        store = TestBed.inject(MockStore);
        httpService = TestBed.inject(SignUpService);
        toastrService = TestBed.inject(ToastrService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should sign up', (done) => {
        const spy = spyOn(httpService, 'signUp').and.callThrough();
        actions$ = of({ type: signUpActions.SIGN_UP, user: mockUser });

        effects.signUp$.pipe(pairwise()).subscribe(([fAction, sAction]) => {
            expect(fAction).toEqual(signUpActions.signUpSuccess({ user: mockUser }));
            expect(sAction).toEqual(signUpActions.signUpAlertSuccess({ title: 'Success', description: 'User created successfully!' }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should display success', (done) => {
        const spy = spyOn(toastrService, 'success').and.callThrough();
        actions$ = of({ type: signUpActions.SIGN_UP_ALERT_SUCCESS, title: 'Success', description: 'User created successfully!' });

        effects.displaySuccess$.subscribe(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should display error', (done) => {
        const spy = spyOn(toastrService, 'error').and.callThrough();
        actions$ = of({ type: signUpActions.SIGN_UP_ALERT_ERROR, title: 'Error', description: 'It was not possible to create user!' });

        effects.displayError$.subscribe(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
