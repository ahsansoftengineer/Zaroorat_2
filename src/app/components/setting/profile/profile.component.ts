import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser;
  errMessage: string = '';
  isError: boolean = false;
  constructor(private userService: UserService) {
    this.getUser(1);
  }

  ngOnInit() {}

  getUser(id: number) {
    this.isError = true;
    this.userService.get(id).subscribe(
      (user) => (this.user = user),
      (err) => (this.errMessage = err),
      () => {
        this.errMessage = 'User with Name : ' + this.user.name;
        this.isError = false;
      }
    );
  }
}
