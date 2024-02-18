import { Injectable } from '@angular/core';
import { GlobalKeys } from '../models/global-keys..enum';
import { RegisterModel } from '../models/register-form.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { }

  login(payload: any){
    localStorage.setItem(GlobalKeys.LOGIN,payload)
  }
  register(payload: RegisterModel){
    let userList = this.getUsers() ? this.getUsers() : [];
    userList.push(payload);
    const obj = JSON.stringify(payload);
    localStorage.setItem(GlobalKeys.REGISTER, obj);
  }

  getUsers(){
    const users = JSON.parse(localStorage.getItem(GlobalKeys.REGISTER)!)
    return users;
  }
}
