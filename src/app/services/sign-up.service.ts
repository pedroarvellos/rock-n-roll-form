import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { User } from "./sign-up.type";

@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  public signUp(user: User) {
    return this.httpClient.post<User>(environment.address + '/users', user);
  }
}
