import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAttribute } from 'src/app/shared/interfaces/attribute.interface';
import { AttributeService } from 'src/app/shared/service/attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {
  constructor(
    private _service: AttributeService,
    private router: Router,
  ) {}
  result : string = ''
  ngOnInit() {
    this.referesh();  
  }

  isError: boolean = false;
  errMessage: string = '';
  attributes: IAttribute[] = [];
  collectionSize: number = 10;
  pageSize: number = 10;
  page: number = 1
  referesh() {
    this._service.gets().subscribe(
      (attributes) => {
        this.attributes = attributes
      },
      (err) => {
        console.log(err);
        this.isError = true;
        this.errMessage = err;
      },
      () => {
        this.isError = false;
        this.collectionSize = this.attributes.length;
        this.errMessage = 'Date Reterived Successfully';
      }
    );
  }
  modified(id: number): void {
    this.router.navigate([`/category/add-category/${id}`]);
  }
}
