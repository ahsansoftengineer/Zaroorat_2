import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForm } from 'src/app/shared/forms/user-form';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/service/auth.service';
import { GroupService } from 'src/app/shared/service/group.service';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  productCategories:any;
  errMessage: string = '';
  showRegister=true;
  phoneOTP='';
  emailOTP='';
  isError: boolean = false;
  private vendor: IUser;
  cities = [
    {
    name: 'Karachi'
    },
    {
    name: 'Hyderabad'
    },
    {
    name: 'Lahore'
    },
    {
    name: 'Rawalpindi'
    },
    {
    name: 'Islamabad'
    },
]

  constructor(
    private formBuilder: FormBuilder,
    private userForm: UserForm,
    private groupService:  GroupService ,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.userForm.getForm();
    this.getAllProductCategory();
  }

  getAllProductCategory() {
    
    this.groupService.getCategories().subscribe(resp => {
      this.productCategories = resp.data;
      console.log(this.productCategories)
    },
    (err) => {
      console.log(err)
    })
  }

  validateNumber(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  validate(control: string): boolean {
    return (
      this.registerForm.get(control).invalid &&
      this.registerForm.get(control).touched
    );
  }

  registerVendor(confirmPassword, terms) {
    const email = this.registerForm.get('email').value;
    this.vendor = this.registerForm.value;

    const params = {
      businessAddress: this.vendor.businessAddress,
      businessCity: this.vendor.city,
      businessContact: '+92' + this.vendor.businessContact,
      businessCountry: 'PAKISTAN',
      businessName: this.vendor.businessName,
      cnic: this.vendor.cnic,
      email: this.vendor.email,
      groupId: this.vendor.businessCategory,
      ntn: this.vendor.nTNNumber,
      password: this.vendor.password,
      personContact: '+92' + this.vendor.personalContact,
      personName: this.vendor.name,
    }
    this.isError = true;
    // terms.checked is transfared from Template
    // console.log(this.registerForm.valid)
    if (this.registerForm.valid) {
      // confirmPassword.value is transfared from Template
      if (confirmPassword == this.registerForm.get('password').value) {
        if (terms) {
         
          this.vendor.id = 0;
       
          this.authService.registerCompany(params).subscribe(
            resp => {
   
           
              this.isError = false;
              this.errMessage = 'User Registered : ' + this.vendor.name;
              
              setTimeout(() => {
                this.showRegister = !this.showRegister;
                this.errMessage = ''
              },2000);
             
              // this.router.navigateByUrl('emailverificationsuccess/',email);
            },
            (err) => {
              if(err.status && err.status == '40003'){
                this.toastService.errormessage('Error', 'err.message');
                return;
              }
              this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
            
            }
          );
        } else {
       
          this.toastService.show('Please Accept the Terms and Conditions', { classname: 'bg-danger text-light' });
        }
      } else {
       
        this.toastService.show('Password Not Match', { classname: 'bg-danger text-light' });
      }
    } else {
      
      this.toastService.show('Please Fill all the Required Fields', { classname: 'bg-danger text-light' });

    }
  }

  OTPVerify(){
    const params = {
      email: this.registerForm.get('email').value,
      emailOtp: this.emailOTP,
      phoneOtp: this.phoneOTP
    }

    if(this.emailOTP != '' && this.phoneOTP != ''){
      if(this.emailOTP.length == 6 && this.phoneOTP.length == 6 ){
        this.authService.verifyOTP(params).subscribe(resp => {
          this.isError = false;
          this.errMessage = 'OTP verified.' ;
          console.log(resp);
          this.router.navigateByUrl('/auth/emailverificationsuccess');
        },
        error => {
          this.errMessage = error.message;
         this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
        });
      }else{
    
        this.toastService.show('Please fill in correct OTP.', { classname: 'bg-danger text-light' });
      }
    }else {
      this.toastService.show('Please Fill all the Required Fields', { classname: 'bg-danger text-light' });
    }
  }

}
