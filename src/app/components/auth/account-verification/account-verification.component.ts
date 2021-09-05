import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public email:string;
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
  }


}
