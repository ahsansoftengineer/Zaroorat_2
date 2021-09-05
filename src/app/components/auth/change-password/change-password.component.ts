import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user: FormGroup = new FormGroup({});
  isError: boolean = false;
  errMessage:string = '';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = new FormGroup({
      password:new FormControl("", [Validators.required, Validators.minLength(5)]),
      confirmPassword:new FormControl("", [Validators.required, Validators.minLength(7)]),
    });
  }
  changePassword(){
    console.log(this.user.value)
    const userName = this.user.get('userName').value
    const password = this.user.get('password').value
    const confirmPassword = this.user.get('confirmPassword').value
    this.isError = true;
      if(this.user.valid){
        if(password === confirmPassword){
          this.userService.changePassword(userName, password).subscribe(
            (user) =>{},
            (err) => {
              this.errMessage = err
            },
            () => {
              this.isError = false;
              this.errMessage = 'Password has been Changed'
            }
          )
        } else {
          this.errMessage = 'Password and Confirm Password not Match'
        }
     
    } else{
      this.errMessage = 'Please Provide all the Fields'
    }
  }
  validate(control: string): boolean {
    return (
      this.user.get(control).invalid &&
      this.user.get(control).touched
    );
  }
}
