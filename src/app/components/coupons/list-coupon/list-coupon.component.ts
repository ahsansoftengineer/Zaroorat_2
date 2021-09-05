import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICoupon } from 'src/app/shared/interfaces/coupon.interface';
import { CouponService } from 'src/app/shared/service/coupon.service';
import { listCouponsDB } from 'src/app/shared/tables/list-coupon';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
})
export class ListCouponComponent implements OnInit {
  constructor(
    private _service: CouponService,
    private router: Router,
    private _domSanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.getCoupons();
    this.digital_categories = listCouponsDB.list_coupons;
  }

  digital_categories = [];
  selected = [];
  coupons: ICoupon[];
  isError: boolean = false;
  errMessage: string = '';
  public settings = {
    actions: false,
    columns: {
      id: {
        title: 'Id',
        filter: false,
      },
      title: {
        title: 'Coupon Title',
        filter: false,
      },
      couponCode: {
        title: 'Code',
        filter: false,
      },
      discountType: {
        title: 'Discount Type',
        filter: false,
      },
      startDate: {
        title: 'Start Date',
        filter: false,
        // valuePrepareFunction: (date: any) => {
        //   return date.day + '-' + date.month + '-' + date.year;
        // },
      },
      endDate: {
        title: 'End Date',
        filter: false,
        // valuePrepareFunction: (date: any) => {
        //   return date.day + '-' + date.month + '-' + date.year;
        // },
      },
      quantity: {
        title: 'Quantity',
        filter: false,
      },
      // images: {
      //   title: 'Images',
      //   type: 'html',
      //   filter: false,
      //   valuePrepareFunction: (images) => {
      //     let imgs: string = '';
      //     images.forEach((image) => {
      //       imgs += `<img src="${image}" height="30" width="30">`;
      //     });
      //     return this._domSanitizer.bypassSecurityTrustHtml(imgs);
      //   }
      // },
      // productVariations: {
      //   title: 'Variations',
      //   filter:false,
      // }
    },
  };

  getCoupons() {
    this._service.gets().subscribe(
      (coupons) => (this.coupons = coupons),
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
  onUserRowSelect(event): void {
    const id: string = event?.data?.id;
    this.router.navigate([`/coupons/create-coupons/${id}`]);
  }
}
