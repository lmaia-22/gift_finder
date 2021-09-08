import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {forkJoin, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { ProductService } from '../../../services/mdf/product/product.service';
import { FabricplanService } from '../../../services/mdf/fabricplan/fabricplan.service';
import { Product } from '../../../models/mdf/product';
import { Fabricplan } from '../../../models/mdf/fabricplan';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductsComponent implements OnInit {

  fabricPlanId:Number;
  products:Product[];
  
  //new
  name:string;
  fabricp:number;
  description:string;
  price:number;
  active:boolean;

  //view
  fabricplan: Fabricplan;
  plan_desc: Array<String> = [];
  empt: Array<String> = ['No fabric plan'];

  //view select
  fabricplans: Fabricplan[];

  //edit
  product : Product;
  editproduct: Product;
  closeResult: string;

  constructor(private productservice: ProductService,
  private fabricplanservice: FabricplanService,
  private activatedRoute: ActivatedRoute,
  private modalService: NgbModal,
  private router: Router) { }

  ngOnInit() {

  this.productservice.getProducts().subscribe(products => {
    this.products = products;
        console.log("Produtos", this.products);
  const plans_desc$ = this.products.map( element => 
    this.fabricplanservice.getfabricplan(element.fabricPlanId).pipe(
    // map it to the value you want
    map((response) => {
      this.fabricplan = response;
      return this.fabricplan['description'];
    }),
    // replace 404 responses with the  'No fabric plan'
    // if not 404 throw the error again
    catchError((error) => {
      if(error.status === 404){
        return this.empt;
      } else {
        throwError(error);
      }
    })));
    forkJoin(plans_desc$).subscribe((plans_desc) => this.plan_desc = plans_desc); 
  });
      this.fabricplanservice.getfabricplans().subscribe(fabricplans => {
        this.fabricplans = fabricplans;
      });
}

  //POST
  onSubmit(f: NgForm): void{ 
      const newProduct: Product = {  
        name: this.name,
        fabricPlanId: this.fabricp,
        description: this.description,
        price: this.price,
        active: this.active } as Product;
      this.productservice.postProduct(newProduct)
        .subscribe(product => this.products.push(product));
  }

  //Open edit pop-up
  open(content, id) {
    this.productservice.getProduct(id).subscribe(product => {
      this.product = product
  });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  

  //Edit
  putProduct(edit: NgForm) {
    const editProduct: Product = {
        fabricPlanId: this.product.fabricPlanId,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        active: this.product.active,
      } as Product;
      this.productservice.updateProduct(this.product.id, editProduct)
        .subscribe(product => {
          var index = this.products.findIndex(p => p.id == this.product.id);
          this.products[index] = product;
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  delete(id): void {
    this.productservice.deleteProduct(id).subscribe(
      () => {
        var index = this.products.findIndex(o => o.id == id);
        this.products.slice(index,1);
      })
      window.location.reload();
  }
  

}