import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AttributeForm } from 'src/app/shared/forms/attribute-form';
import { IAttribute } from 'src/app/shared/interfaces/attribute.interface';
import { AttributeService } from 'src/app/shared/service/attribute.service';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss'],
  providers: [AttributeForm]
})
export class AddAttributeComponent implements OnInit {
  constructor(
    private _service: AttributeService,
    private _form: AttributeForm,
    private route: ActivatedRoute,
  ) {}

  form: FormGroup;
  attributes: IAttribute[];
  attribute: IAttribute;
  errMessage: string = 'error Message to Display';
  editMode: boolean = false;
  isError: boolean = false;
  id: number = undefined;

  ngOnInit(): void {
    this.form = this._form.getForm();
    this.isError = false;
    this.errMessage = 'Attribute Data Reterived';
    this.get();
  }
  get() {
    let id: number;
    this.editMode = false;
    this.route.params.subscribe(
      (params: Params) => {
        id = +params['id'];
      },
      (error) => {
        this.errMessage = error;
      },
      () => {
        console.log(this.id);
      }
    );
    if (!isNaN(id)) {
      this.editMode = true;

      this._service.get(id).subscribe(
        (attribute: IAttribute) => {
          this._form.mapModelValuesToForm(attribute, this.form);
          this.attribute = attribute;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.errMessage = 'Unable to display result of ID ' + id;
          this.form = this._form.getForm();
        },
        () => {
          this.isError = false;
          this.errMessage = 'Showing Result of ID ' + id;
        }
      );
    } else {
      this.editMode = false;
      this.errMessage = 'Id is not Valid';
    }
  }
  gets() {
    this._service.gets().subscribe(
      (attributes) => {
        this.attributes = attributes
      },
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.isError = true;
        this.errMessage = 'Message: ';
      }
    );
  }
  modify(action: string) {
    this.attribute = this._form.mapFormValuesToModel(
      this.form
    );
    let result: any;
    if (action === 'Add') {
      this.attribute.id = null;
      result = this._service.add(
        this.attribute
      );
    } else if (action === 'Update') {
      result = this._service.update(
        this.attribute
      );
    } else if (action === 'Delete') {
      result = this._service.delete(
        this.attribute.id
      );
    }
    result.subscribe(
      () => {
        this.errMessage = action + ' ' +
          this.attribute.unit + ' Successfully';
        this.isError = false;
        this.form.patchValue({
          category: ''
        })
        this.gets();
        // this.router.navigateByUrl('/products/physical/category-list')
      },
      (err) => {
        console.log(err);
        this.errMessage = this.attribute.unit + ' not ' + action + ' Successfully';
        this.isError = true;
      }
    );
  }
  validate(control: string): boolean{
    return this.form.get(control).invalid && this.form.get(control).touched
  }
}
