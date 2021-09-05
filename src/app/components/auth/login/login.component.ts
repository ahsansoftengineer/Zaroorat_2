import { HttpErrorResponse } from '@angular/common/http';
import { wrapReference } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForm } from 'src/app/shared/forms/user-form';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private vendor: IUser;
  showRegister=true;
  showLogin=true;
  showPhoneOTP=false;
  verifyToken;
  showOTP=false;
  hide=true;
  showPassField=false;
  showforgotPassword=false;
  phoneOTP='';
  newPassword='';
  emailOTP='';
  forgotEmail='';
  loginForm: FormGroup;
  registerForm: FormGroup;
  productCategories:any;
  errMessage: string = '';
  errMessageLogIn: string = '';
  isError: boolean = false;
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

owlcarousel = [
  {
    title: 'Welcome to Zaroorat',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
  {
    title: 'Vendors Options',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
  {
    title: 'Why we are Different',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
];

  constructor(
    private formBuilder: FormBuilder,
    private userForm: UserForm,
    private productCategoryService: ProductCategoryService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) {
  }
  ngOnInit() {
    this.registerForm = this.userForm.getForm();
    this.createLoginForm();
    this.getAllProductCategory();
  }
 
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };
  
  getAllProductCategory() {
    
    

    this.productCategoryService.getCategories().subscribe(resp => {
      this.productCategories = resp.data;
      console.log(this.productCategories)
    },
    (err) => {
      console.log(err)
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required]),
      ],
      password: ['', Validators.compose([Validators.required])],
      otp: [''],
    });
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
              this.errMessage = 'User Registerd : ' + this.vendor.name;
              console.log(resp);
              setTimeout(() => {
                this.showRegister = !this.showRegister;
                this.errMessage = ''
              },2000);
             
              // this.router.navigateByUrl('emailverificationsuccess/',email);
            },
            (err) => {
              this.errMessage = err.message;
              this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
              if(err.status && err.status == '40003'){
                this.showRegister = !this.showRegister;
                this.errMessage = ''
                console.log(this.showRegister)
              }
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

  displayforgotPassword(){
    this.showforgotPassword = true;
    this.showLogin=false;
    this.showOTP=false;
    
  }

  forgotPassword(){
    
    const param = {
      email : this.forgotEmail
    }

    if(!this.hide && this.showPassField){
      const data = {
        email : this.forgotEmail,
        password: this.newPassword,
        token: this.verifyToken
      }

      this.authService.newPasswordRequest(data).subscribe(resp => {
        this.toastService.show('Password Changed', { classname: 'bg-success text-light'});
        window.location.reload();
      },
      error=> {
        this.errMessage = error.message;
        this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
      })
      return;
    }

  
    if(!this.hide){
      const params = {
        email : this.forgotEmail,
        otp: this.emailOTP
      }
      this.authService.verifyForgotPasswordOTP(params).subscribe(resp => {
        this.verifyToken = resp.data.verificationToken;
        this.showPassField = true;

        this.toastService.show('OTP verified successfully!', { classname: 'bg-success text-light'});

        // window.location.reload();
        
      },
      error =>{
        this.errMessage = error.message;
        this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
      })
      return;
    }
    this.hide = !this.hide

    this.authService.sendForgotPasswordOTP(param).subscribe(resp =>{
      console.log(resp);
      this.toastService.show('OTP sent successfully!', { classname: 'bg-success text-light'});
      this.hide = !this.hide
    },
    (error) => {
      console.log(error)
      this.errMessage = error.message;
      this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
    })

   return;
  }

  validateNumber(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  logInVendor() {
    this.isError = true ;
    if (this.loginForm.valid) {
    
      const params = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }

      if(this.showPhoneOTP){
       const data = {
         email: params.email,
         otp: this.loginForm.get('otp').value,
         token: this.verifyToken,
         type: "LOGIN"
       }

        this.authService.verifyAdminOTP(data).subscribe(resp => {
          console.log(resp.data);
          this.authService.setSession(resp.data);
          this.router.navigateByUrl('/vendors/list-vendors');
          this.toastService.show('Sign-in Successfully!', { classname: 'bg-success text-light'});
        },
        err=> {
          this.errMessage = err.message;
          this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
        });
        return;
      }

      if (params.email.includes('admin')) {
        this.authService.loginAdmin(params).subscribe(
        
          (resp) => {
            this.loginForm.controls['otp'].setValidators([Validators.required, Validators.maxLength(6)]);
            this.verifyToken = resp.data.token;
            this.showPhoneOTP = true;
            this.toastService.show('OTP has been sent to your phone.', { classname: 'bg-success text-light'});
          },
          (err) => {  
            this.errMessage = err.message;
            this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
          }
          
        );
        return;
       
      }
      this.authService.loginCompany(params).subscribe(
        
        (resp) => {
          console.log(resp);
          this.authService.setSession(resp.data);
          this.router.navigateByUrl('/vendors/list-vendors');
          this.toastService.show('Sign-in Successfully!', { classname: 'bg-success text-light'});
        },
        (err) => {
          console.log(err);
          this.errMessage = err.message;
          this.toastService.show(this.errMessage, { classname: 'bg-danger text-light' });
          
          if(err.status && err.status == '3005'){
            this.router.navigateByUrl('/auth/emailverificationsuccess');
          }
          if(err.status && err.status == '3004'){
            this.showOTP = !this.showOTP;
            this.showLogin=false;
            
          }
        }
        
      );
    } else {
      this.toastService.show( 'Please provide User Name and Password', { classname: 'bg-danger text-light' });
    }
  }
}
