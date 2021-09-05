import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/service/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(
    private _service: OrderService,
    private _domSanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.getOrders();
  }
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   // filter our data
  //   const temp = this.temp.filter(function (d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   // update the rows
  //   this.order = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.table.offset = 0;
  // }

  selected = [];
  orders: IOrder[];
  isError: boolean = false;
  errMessage: string = '';
  public settings = {
    actions: false,
    columns: {
      id: {
        title: 'Id',
        filter: false,
      },
      productOrder: {
        title: 'Orders',
        filter: false,
        type: 'html',
        valuePrepareFunction: (status) => {
          let result:string = ''
          status.forEach(element => {
            result = result + element.order + ', '
          });
          return this._domSanitizer.bypassSecurityTrustHtml(
            result
          );
        }
      },
      quantity: {
        title: 'Quantity',
        filter: false,
      },
      amount: {
        title: 'Amount',
        filter: false,
      },
      orderStatus: {
        title: 'Status',
        filter: false,
        type: 'html',
        valuePrepareFunction: (status) => {
          let result: string;
          if (status === 'deliverd') result = 'success';
          else if (status === 'pending') result = 'primary';
          else if (status === 'onway') result = 'info';
          else if (status === 'queried') result = 'warning';
          else result = 'danger';
          return this._domSanitizer.bypassSecurityTrustHtml(
            `<span class='badge badge-${result}'>${status}</span>`
          );
        },
      },
      orderedTo: {
        title: 'Vendor',
        filter: false,
      },
      orderedBy: {
        title: 'User',
        filter: false,
      },
      orderDate: {
        title: 'Order Date',
        filter: false,
      },
      deliveryDate: {
        title: 'Delivery Date',
        filter: false,
      },
      address: {
        title: 'Delivery Address',
        filter: false,
      },
      reciver: {
        title: 'Reciver',
        filter: false,
      },
    },
  };
  getOrders() {
    this._service.gets().subscribe(
      (orders) => (this.orders = orders),
      (err) => {
        console.log(err);
        this.isError = true;
        this.errMessage = err;
      },
      () => {
        this.isError = false;
        this.errMessage = 'Date Reterived Successfully';
      }
    );
    console.log(this.errMessage);
  }
}
