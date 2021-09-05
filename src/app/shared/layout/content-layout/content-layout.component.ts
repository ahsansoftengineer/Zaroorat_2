import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NavService } from '../../service/nav.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [
    trigger('animateRoute', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          // Set the duration to 5seconds and delay to 2 seconds
          //params: { timing: 3}
        })
      ),
    ]),
  ],
})
export class ContentLayoutComponent implements OnInit {
  constructor(
    public navServices: NavService,
    private userService: UserService
  ) {
    this.getuser(1);
  }
  ngOnInit() {}
  public right_side_bar: boolean;
  public layoutType: string = 'RTL';
  public layoutClass: boolean = false;

  public sidebarColor: string = 'green';
  public chatBotHide: boolean = true;
  public user: IUser;
  myContactedUser: IUser;
  public chatBotLayout(chatHide: boolean) {
    this.chatBotHide = chatHide;
  }
  public errMessage: string = 'no error';
  public isError: boolean = false;

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event;
  }

  public clickRtl(val) {
    if (val === 'RTL') {
      document.body.className = 'rtl';
      this.layoutClass = true;
      this.layoutType = 'LTR';
    } else {
      document.body.className = '';
      this.layoutClass = false;
      this.layoutType = 'RTL';
    }
  }

  getuser(id: number = 1) {
    this.userService.get(id).subscribe(
      (user: IUser) => {
        this.user = user;
      },
      (err: any) => {
        console.log(err);
        this.errMessage = 'Unable to display result of ID ' + id;
      },
      () => {
        this.isError = false;
        this.errMessage = 'Showing Result of ID ' + id;
      }
    );
  }
  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
  }
  changeDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    } else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  letsChat(myContactedUser: IUser) {
    this.myContactedUser = myContactedUser;
  }
}
