import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CouponForm } from 'src/app/shared/forms/coupon-form';
import { ICoupon } from 'src/app/shared/interfaces/coupon.interface';
import { CouponService } from 'src/app/shared/service/coupon.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
})
export class CreateCouponComponent implements OnInit {
  constructor(
    private calendar: NgbCalendar,
    private _form: CouponForm,
    private _service: CouponService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this.form = this._form.getForm();
    if (this._route.snapshot.params['id']) {
      const id = +this._route.snapshot.params['id'];
      this.form.value.id = id;
      this.getCoupon();
    }
  }
  form: FormGroup;
  model: NgbDateStruct;
  date: { year: number; month: number };
  modelFooter: NgbDateStruct;
  coupon: ICoupon;
  editMode: boolean = false;
  isError: boolean = false;
  errMessage: string = '';

  selectToday() {
    this.model = this.calendar.getToday();
  }

  getCoupon() {
    let id: number;
    this.editMode = false;
    this._route.params.subscribe((params: Params) => {
      id = +params['id'];
    });
    if (!isNaN(id)) {
      this.editMode = true;
      this._service.get(id).subscribe(
        (coupon: ICoupon) => {
          this._form.mapModelValuesToForm(coupon, this.form);
          this.coupon = coupon;
          console.log(coupon);
          
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.errMessage = 'Unable to display result of ID ' + id;
          // Resetting All Controls
          this.form = this._form.getForm();
          // this.resettingImages();
        },
        () => {
          // Dynamically Setting Nested Form Group
          this.form.setControl(
            'restriction',
            this._form.setExistingRestriction(this.coupon.restriction)
          );
          // Dynamically Setting Nested Form Group
          this.form.setControl(
            'usage',
            this._form.setExistingUsage(this.coupon.usage)
          );
          this.isError = false;
          this.errMessage = 'Showing Result of ID ' + id;
        }
      );
    } else {
      this.editMode = false;
      this.errMessage = 'Id is not Valid';
    }
  }
  validate(control: string): boolean{
    return this.form.get(control).invalid && this.form.get(control).touched
  }
  modifyCoupon(action: string){
    this.coupon = this._form.mapFormValuesToModel(
      this.form
    );
    let result: any;
    if (action === 'Add') {
      // this.coupon.id = null;
      result = this._service.add(
        this.coupon
      );
    } else if (action === 'Update') {
      result = this._service.update(
        this.coupon
      );
    } else if (action === 'Delete') {
      result = this._service.delete(
        this.coupon.id
      );
    }
    result.subscribe(
      () => {
        this.errMessage =
          this.coupon.title +
          action + ' ' +
          ' Successfully'
        this.isError = false;
        this._router.navigateByUrl('/coupons/list-coupons')
      },
      (err) => {
        console.log(err);
        this.errMessage = this.coupon.title + ' not ' + action + ' Successfully';
        this.isError = true;
      }
    );
  }
  getDate(date: Date){
    return date.getDate()
  }
}
