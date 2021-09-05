import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from 'src/app/shared/service/group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  group:any;
  id:any;
  name:string;
  constructor(private groupService: GroupService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      },
      (error) => {
        // this.errMessage = error;
      },
      () => {
        console.log(this.id);
      }
    );

    this.getGroup()
  }

  getGroup(){
    console.log(this.id)
    this.groupService.getGroup(this.id).subscribe(resp => {
      this.group = resp.data.categories;
      this.name = resp.data.name;
    })
  }

}
