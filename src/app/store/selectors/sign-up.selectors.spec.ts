import { SignUpState } from '../reducers/sign-up.reducer';
import { getSignUpStatus } from './sign-up.selectors';

const initialState: SignUpState = {
  user: null,
  isLoading: false,
  error: null,
};

describe('SignUpSelectors', () => {

  it('should get status', () => {
    const result = getSignUpStatus.projector(initialState);

    expect(result).toBeFalse();
  });
});
