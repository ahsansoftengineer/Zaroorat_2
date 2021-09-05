import { Component, OnInit } from '@angular/core';
import { invoiceDB } from '../../shared/tables/invoice';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public invoice : LocalDataSource;

  constructor() {
    this.invoice = new LocalDataSource(invoiceDB.data);
  }
  public settings = {
    actions: {
      add:false,
      edit:false,
      delete:false
    },
    columns: {
      no: {
        title: 'No',
        addable: false,
      },
      invoice: {
        title: 'Invoice'
      },
      date: {
        title: 'Date'
      },
      shipping: {
        title: 'Shipping'
      },
      amount: {
        title: 'Amount'
      },
      tax: {
        title: 'Tax'
      },
      total: {
        title: 'Total'
      },
      status: {
        title: 'Status'
      }
    },
  };
  ngOnInit() {
  }
}
