// import { Component, Injector, OnDestroy, OnInit } from "@angular/core";
// import { FormGroup } from "@angular/forms";
// import { LoginForm } from "../../../../forms/login-form";
// import { UserModel } from "../../../../models/user.model";
// import { UserAuthState } from "../../../../store/user/auth/state";
// import { Subscription } from "rxjs";
// import { Router } from "@angular/router";
// import { Store } from "@ngrx/store";
// import { BaseState } from "../../../../store/state";
// import { selectUserAuth } from "../../../../store/user/selectors";
// import { AAAAuthenticateAction } from "../../../../store/user/actions";
// import { MediaProvider } from "../../../common/media-library/media-provider";
// import { HelperService } from "../../../common/shared/helper.service";
// @Component({
//   selector: "app-aaa-login",
//   templateUrl: "./aaa-login.component.html",
//   styleUrls: ["./aaa-login.component.css"],
// })
// export class AaaLoginComponent implements OnInit, OnDestroy {
//   form: FormGroup;
//   formService: LoginForm;
//   user: UserModel;
//   state: UserAuthState;
//   subscription: Subscription = new Subscription();
//   constructor(
//     private router: Router,
//     private store: Store<BaseState>,
//     private loginForm: LoginForm,
//     private mediaProvider: MediaProvider,
//     public helperService: HelperService
//   ) {
//     this.formService = this.loginForm;
//     this.form = this.formService.getAAAForm();
//   }
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
//   ngOnInit() {
//     this.subscription.add(
//       this.store.select(selectUserAuth).subscribe((state: UserAuthState) => {
//         this.state = state;
//         if (state.success) {
//           this.mediaProvider.load().then();
//           this.router.navigateByUrl("/user/dashboard");
//         }
//       })
//     );
//   }
//   login(): void {
//     this.formService.markAsSubmitted();
//     this.form.markAsTouched();
//     if (this.form.valid) {
//       this.store.dispatch(new AAAAuthenticateAction(this.form.value));
//     }
//   }
// }
