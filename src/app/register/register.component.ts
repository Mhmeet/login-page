import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from '../login/login.component';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register-form.interface';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // emailFormControl = new FormControl("");
  // passwordFormControl = new FormControl("");
  // repPasswordFormControl = new FormControl("");
  constructor(private _router: Router, private _loginServices: LoginServiceService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._formChanges();
  }
  private _formChanges() {
    this.registerForm.get("password")?.valueChanges.subscribe(x => {
      this.checkEqualsPassword();
    })
    this.registerForm.get("passwordRep")?.valueChanges.subscribe(x => {
      this.checkEqualsPassword();
    })
  }

  registerForm = new FormGroup(
    {
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      surname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      mail: new FormControl("", [Validators.required, Validators.minLength(10), Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      passwordRep: new FormControl("", [Validators.required, Validators.minLength(5)])

    }
  )
  public getRegisterForm(formName: string, errorType: string) {
    return this.registerForm.get(formName)?.hasError(errorType);
  }
  public getFormNameInValid(formName: string): boolean | undefined {
    return this.registerForm.get(formName)?.invalid;

  }
  public getErrorMessage(formName: string): string {
    if (this.getRegisterForm(formName, 'required')) {
      return 'Please fill in the blank';
    }
    else if (this.getRegisterForm(formName, 'minlength')) {
      return 'Minimum 7 character';
    }
    else if (this.getRegisterForm(formName, 'maxlength')) {
      return 'Please Flill in the blank';
    }
    else if (this.getRegisterForm(formName, 'email')) {
      return 'plase write your email true format';
    }
    else if (this.getRegisterForm(formName, 'missmatch')) {
      return 'your passwords can not match';
    }
    else return "";
  }

  public checkEqualsPassword() {
    if ((this.registerForm.get("password")?.value !== this.registerForm.get("passwordRep")?.value)) {
      this.registerForm.get("password")?.setErrors({ missmatch: true });
      this.registerForm.get("passwordRep")?.setErrors({ missmatch: true });
      this.registerForm.updateValueAndValidity;

      this._cdr.markForCheck();


    }
    else {
      this.registerForm.get("password")?.setErrors(null);
      this.registerForm.get("passwordRep")?.setErrors(null);
      this.registerForm.updateValueAndValidity;
      
      this._cdr.markForCheck();

    }
  }
  isDiasbleForFormGroup(): boolean {
    return !this.registerForm.valid
  }
  register() {
    const payload: RegisterModel | any = this.registerForm.value;
    this._loginServices.register(payload);
  }
}
