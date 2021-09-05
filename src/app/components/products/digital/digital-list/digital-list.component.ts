import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit {
  public digital_list = []

  constructor() {
    // this.digital_list = digitalListDB.digital_list;
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      id: {
        title: 'Id',
      },
      img: {
        title: 'Product',
        type: 'html',
      },
      title: {
        title: 'Product Title'
      },
      entry_type: {
        title: 'Entry Type',
      },
      quantity: {
        title: 'Quantity',
      }
    },
  };

  ngOnInit() { console.log(this.digital_list) }

}
