import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { SignUpService } from './sign-up.service';
import { User } from './sign-up.type';


const mockUser: User = {
  firstName: 'Thomas',
  lastName: 'Shelby',
  email: 'thomas@shelby.co.uk'
};

describe('SignUpService', () => {
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post signUp', () => {
    service.signUp(mockUser).subscribe(res => res);
    const req = httpMock.expectOne(environment.address + '/users');
    expect(req.request.method).toEqual('POST');
    req.flush(null);
    httpMock.verify();
  });
});
