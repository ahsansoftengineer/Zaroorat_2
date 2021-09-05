import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/shared/service/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  constructor(private modalService: NgbModal, config: NgbRatingConfig, private productService:ProductService, private route: ActivatedRoute) {
    config.max = 5;
    config.readonly = false;
  }
  
  public closeResult: string;
  public counter: number = 1;
  public product:IProduct;
  public id:number;
  public colors=[];
  public price:number;

  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(1, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(3, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' })]

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  ngOnInit() {

    if (this.route.snapshot.params['id']){
      this.id = +this.route.snapshot.params['id'];
      // this.getProduct();
    }
  }

  getVariation(variation){
    this.colors = variation.colors;
    this.price = variation.price;
  }

  getProduct(){
    this.productService.get(this.id).subscribe(
      (resp) => {
        let counter = 0;
        this.product = resp;
        this.product.imageCarousel = [];
        const variation = this.product.productVariations.find(item => item.size == 'sm');
        this.colors = variation.colors;
        this.price = variation.price
        this.product.images.forEach((imgObj:any) => {
          const image = new Image(counter++, { img: imgObj.image }, { img: imgObj.image });
          this.product.imageCarousel.push(image);
        });

      },
      (err: any) => {
      },
    );
  }
}
