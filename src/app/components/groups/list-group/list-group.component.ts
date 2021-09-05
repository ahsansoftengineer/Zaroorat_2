import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/shared/service/group.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {
  groups:any[];
  constructor(private groupService: GroupService, public toastService: ToastService ) { }

  ngOnInit(): void {
    this.getGroups()
  }

  getGroups(){
    // this.groups=[];
    this.groupService.getSuperCategories().subscribe(resp => {
      this.groups = resp.data
    })
  }

  onChange(event,group){
    const param = {
      groupId : group.id,
      status: event
    }
    this.groupService.updateStatus(param).subscribe(resp => {
      this.toastService.successmessage('Success', resp.message);
       this.getGroups()
    },
    err => {
      this.toastService.errormessage('Error',err.message)
    })

  }

}
