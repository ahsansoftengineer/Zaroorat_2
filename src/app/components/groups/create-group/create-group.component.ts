import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { CustomMethods } from 'src/app/shared/custom/custom-method';
import { GroupService } from 'src/app/shared/service/group.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  groupForm: FormGroup;
  productCategories = [];
  categories:any;
  selectedCategories: IProductCategory[] = []
  majorCategories: IProductCategory[] = [];
  constructor(private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private groupService: GroupService, 
    public toastService: ToastService) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required]),
      ],
      categories: [null, Validators.compose([Validators.required])],
    });
    this.getCategories()
  }

  getCategories(){
    this.productCategoryService.gets().subscribe(
      (categories) => {
        this.productCategories = categories
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.majorCategory();
        CustomMethods.startProductCategory(this.productCategories)
      }
    )
  }

  checkValue(event,id){
    const checked = event.target.checked;
    if(checked){
      this.selectedCategories.push(id);
      this.groupForm.get('categories').setValue(this.selectedCategories);
      console.log(this.groupForm.getRawValue())
      return;
    }
    else if(!checked){
      const index = this.selectedCategories.indexOf(id);
      this.selectedCategories.splice(index,1);
      this.groupForm.get('categories').setValue(this.selectedCategories);
      console.log(this.groupForm.getRawValue())
      return;

    }
  }

  saveGroup(){
    const params = {
      categoryIds: this.groupForm.get('categories').value,
      name: this.groupForm.get('name').value,
    }
    this.groupService.saveGroup(params).subscribe(resp => {
      this.toastService.successmessage('Success', resp.message)
    },
    err=> {
      this.toastService.errormessage('Error',err.message)
    })
  }
  // This for Initializing the Checkboxes
  majorCategory() {
    this.productCategories.forEach((cate) => {
      if (!cate.pId) {
        this.majorCategories.push(cate);
      }
    });
    this.majorCategories = this.majorCategories.sort(function(a, b){
      var x = a.category.toLowerCase();
      var y = b.category.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;})
  }
}
