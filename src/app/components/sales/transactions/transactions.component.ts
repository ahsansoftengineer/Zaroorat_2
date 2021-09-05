import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ITransaction } from 'src/app/shared/interfaces/transaction.interface';
import { TransactionService } from 'src/app/shared/service/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    private _service: TransactionService,
    private _domSanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.getTransactions();
  }
  selected = [];
  transactions: ITransaction[];
  isError: boolean = false;
  errMessage: string = '';
  public settings = {
    actions: false,
    columns: {
      orderId: {
        title: 'Order Id',
        filter: false,
      },
      transactionId: {
        title: 'Transaction Id',
        filter: false,
      },
      date: {
        title: 'Date',
        filter: false,
      },
      payMethod: {
        title: 'Payment Method',
        filter: false,
        type: 'html',
        valuePrepareFunction: (payment) => {
          return this._domSanitizer.bypassSecurityTrustHtml(
            `<span class='badge badge-success'>${payment}</span>`
          );
        },
      },

      deliveryStatus: {
        title: 'Delivery Status',
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
      amount: {
        title: 'Amount',
        filter: false,
      },
    },
  };
  getTransactions() {
    this._service.gets().subscribe(
      (transactions) => (this.transactions = transactions),
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
