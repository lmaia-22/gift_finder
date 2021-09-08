import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { OrderService } from '../../../services/orders/order/order.service';
import { Order } from '../../../models/orders/order';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/mdf/product';
import { ProductService } from 'src/app/services/mdf/product/product.service';
import { UserService } from 'src/app/services/orders/user/user.service';
import { User } from '../../../models/orders/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:Order[];
  products:Product[];

  users: User[];
  user: User;
  usr: User;

  constructor(private orderservice: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

    //user
    role:string = localStorage.getItem('role');
    actions:string = localStorage.getItem('actions');
    user_id:string = localStorage.getItem('user').slice(1,-1);

    //edit & new
    closeResult: string;
    id: number;
    
    //new order
    userId: number;
    quantity: number;
    product: number;
    order: Order;

    //edit user
    name:string;
    address:string;

    //edit order
    date:string;
    productId: number;
    
    //cancel order
    status:string = "Canceled";

    //accpet order
    status1:string = "Delivered";
    currentDate = new Date().toISOString();
    permissions;

  ngOnInit() {
    this.permissions = JSON.parse(this.actions);
    //admin
    if(this.role === "0"){
      this.orderservice.getOrders().subscribe(order => {
        this.orders = order['orders'];
        console.log(order);
      });
      this.userService.getUsers().subscribe(user =>{
        this.users = user['users'];
      });
    }else{
      console.log(this.user_id);
      this.orderservice.getOrderbyUser(this.user_id).subscribe(order => {
        this.orders = order['orders'];
        console.log(this.orders);
      });
      this.productService.getProducts().subscribe(products => {
        this.products = products;
        console.log(this.products);
      });
      this.userService.getUser(this.user_id).subscribe(user =>{
        this.usr = user['User'];
        console.log(this.usr);
    });
  }

}

// edit pop-up order
open(content, id) {
    if(this.role === "0" && this.permissions[0].EditOrder === 1){
      this.orderservice.getOrder(id).subscribe(order => {
      this.order = order['order'];
    });
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}else{
  // não tem acesso
  alert("You don´t have Access");
  }
}

 //POST ORDER
onSubmit(f1: NgForm, id): void{ 
  console.log(this.role, this.permissions[0].NewOrder);
  if(this.role === "1" && this.permissions[0].NewOrder == 1){
    const newOrder: Order = {
      productId: this.product,
      userId: this.user_id,
      quantity: this.quantity
    } as unknown as Order;
    console.log(newOrder);
    this.orderservice.postOrder(newOrder)
      .subscribe(order => this.orders.push(order));
      alert("Order Created");
      window.location.reload();
  }else{
    console.log("fora")
  }
}

//PUT
putOrder(edit1: NgForm, Id){
  console.log(Id);    
  const editOrder: Order = {  
      quantity: this.quantity,
      product: this.productId
      } as unknown as Order;
      this.orderservice.updateOrder(Id, editOrder)
        .subscribe(order => {
          var index = this.orders.findIndex(o => o.id == Id);
          this.orders[index] = order;
        })
        window.location.reload();
}

//cancel order
cancelorder(Id){
  if(this.role === "0"){
  console.log(Id);    
  const editOrder: Order = {  
      status: this.status, 
      changestatusorder: this.currentDate
      } as unknown as Order;
      this.orderservice.updateOrder(Id, editOrder)
        .subscribe(order => {
          var index = this.orders.findIndex(o => o.id == Id);
          this.orders[index] = order;
        });
        alert("Order canceled");
        window.location.reload();
      }
}
//accpet order
acceptorder(Id){
  if(this.role === "0"){
  console.log(Id);    
  const editOrder: Order = {  
      status: this.status1,
      changestatusorder: this.currentDate
      } as unknown as Order;
      this.orderservice.updateOrder(Id, editOrder)
        .subscribe(order => {
          var index = this.orders.findIndex(o => o.id == Id);
          this.orders[index] = order;
        });
        alert("Order Accept");
        window.location.reload();
}
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
  if(this.role === "1"){
  this.orderservice.deleteOrder(id).subscribe(
    () => {
      var index = this.orders.findIndex(o => o.id == id);
      this.orders.slice(index,1);
    })
    window.location.reload();
  }
}

}
