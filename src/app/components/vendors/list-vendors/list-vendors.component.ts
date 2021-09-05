import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.scss'],
})

export class ListVendorsComponent implements OnInit {

  users= [];
  isError: boolean = false;
  errMessage: string = '';
  isLoading=false;

  constructor(private userService: UserService, private router: Router, public toastService: ToastService, ) {}
  ngOnInit() {
    this.refereshUser();

  }

  onChange(event,user){
    const param = {
      companyId : user.id,
      status: event
    }
    this.userService.approveCompany(param).subscribe(resp => {

      this.toastService.successmessage('Successful',resp.message);
      this.refereshUser();
    },
    error =>{
      this.toastService.errormessage('Error', error.message)
    })
  }

  onSort(event) {

    // resetting other headers
    console.log(event)
  }

  refereshUser() {
    this.userService.getUsers().subscribe(resp => {
      console.log(resp);
      this.users = resp.data;
    },
    err=> {

    })
  }
  // query parameters programmatically
  // this.router.navigate(['/user', id, 'edit'], {
  //   queryParams: { allowEdit: 1, disabled: false, king: 'Lion' },
  //   fragment: '102',
  // });
  onUserRowSelect(event): void {
    // const id: string = event?.data?.id;
    //   this.router.navigate([`/vendors/create-vendors/${id}`]);
      // this.router.navigate(['/vendors/create-vendors']);
  }
}
