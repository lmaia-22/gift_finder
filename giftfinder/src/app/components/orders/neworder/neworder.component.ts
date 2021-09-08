import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { OrderService } from '../../../services/orders/order/order.service';
import { Order } from '../../../models/orders/order';
import { Product } from 'src/app/models/mdf/product';
import { ProductService } from 'src/app/services/mdf/product/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})


export class NeworderComponent implements OnInit {
  @Input() title = `Information`;


  orders:Order[];
  products:Product[];
  selected:number;

  //user
  role:string = localStorage.getItem('role');
  actions:string = localStorage.getItem('actions');
  user_id:string = localStorage.getItem('user').slice(1,-1);

  constructor(private orderservice: OrderService,
    private productService: ProductService,
    public activeModal: NgbActiveModal) { }

    permissions;

  ngOnInit() {
    this.permissions = JSON.parse(this.actions);
    this.selected= this.id;
    console.log (this.selected);
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  //edit & new
  closeResult: string;
  id: number;
  
  //new order
  userId: number;
  quantity: number;
  product: number;
  order: Order;

   //POST ORDER
onSubmit(neword: NgForm, id): void{ 
  if(this.role === "1" && this.permissions[0].NewOrder == 1){
    const newOrder: Order = {
      productId: this.selected,
      userId: this.user_id,
      quantity: this.quantity
    } as unknown as Order;
    console.log(newOrder);
    this.orderservice.postOrder(newOrder)
      .subscribe(order => this.orders?this.orders.push(order):null);
      alert("Order Created");
      this.activeModal.close();
      window.location.reload();
}
else{
  alert("Não pode criar");
}
}

}
