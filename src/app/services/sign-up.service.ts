import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
};

@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  public createUser(user: User) {
    return this.httpClient.post<User>(environment.address + '/users', user).pipe(
      map((res) => res),
      catchError((err) => err)
    );
  }
}
