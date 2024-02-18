import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register-form.interface';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _router:Router, private _loginServices:LoginServiceService){
    
  }
  // emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  // passwordFormControl = new FormControl("",[Validators.required,Validators.minLength(7)]);
  // isDisable(): boolean{
    //   return !(this.emailFormControl.valid && this.passwordFormControl.valid);
    // }
    isLogin : boolean = false;
    loginForm = new FormGroup(
      {
        mail: new FormControl("",[Validators.required, Validators.email]),
        password: new FormControl("",[Validators.required,Validators.minLength(7)])
      }
      );
      isDiasbleForFormGroup():boolean{
        return !this.loginForm.valid;
      }

      login(){
        const users: RegisterModel[] = this._loginServices.getUsers();
        users.forEach(user =>
          {
            if(user.mail ===this.loginForm.get("mail")?.value && this.loginForm.get("password")?.value){
              this._loginServices.login(this.loginForm.value)
              this.isLogin = true    
              this._router.navigateByUrl("/home");          
            }
            else{

            }

          })
          if(!this.isLogin){
            window.alert("Böyle bir kull")
            this.isLogin=false;
          }
      }
      goToRegister() {
        this._router.navigateByUrl("/register");
      }

}
