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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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
    user_id:string = JSON.parse(localStorage.getItem('user'));
    actions:string = localStorage.getItem('actions');
    permissions;

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
    roleedit:number;


  ngOnInit() {
    this.permissions = JSON.parse(this.actions);
    //admin
    if(this.role === "0"){
      this.userService.getUsers().subscribe(user =>{
        this.users = user['users'];
        console.log(user);
      });
    }else{
      console.log(this.user_id);
      this.userService.getUser(this.user_id).subscribe(user =>{
        this.usr = user['User'];
        console.log(this.usr);
    });
  }

}

 //Open edit pop-up user
 openuser(content1, id) {
   if(this.permissions[0].EditClient === 1 || this.permissions[0].EditClientAdmin===1){
  this.userService.getUser(id).subscribe(user => {
    this.user = user['User'];
    console.log(this.user);
  });

  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }
  else{
    alert("No Access");
  }
}

//see actions
actions1(content2, id) {
  if(this.permissions[0].EditClientAdmin===1){
  this.userService.getUser(id).subscribe(user => {
    this.user = user['User'];
  });

  this.modalService.open(content2, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}else{
  alert("No access");
}
}

//PUT User
putUser(edit: NgForm, Id){
  console.log(Id);    
  const editUser: User = {  
      name: this.user.name,
      address: this.user.address,
      actions: this.user.actions
      } as User;
      console.log(editUser);
      this.userService.updateUser(Id, editUser)
        .subscribe(user => {
          var index = this.users.findIndex(o => o.id == Id);
          this.users[index] = user;
        })
        alert("Updated");
        window.location.reload();
}

putActionsList(key, value) {
  this.user.actions[0][key] = value === 1 ? 0 : 1
}

putActions(edit: NgForm, Id){
  console.log(Id);    
  console.log(this.roleedit);
  const editUser: User = {  
      name: this.user.name,
      address: this.user.address,
      role: this.roleedit,
      actions: this.user.actions
      } as User;
      console.log("ei", editUser);
      this.userService.updateUser(Id, editUser)
        .subscribe(user => {
          var index = this.users.findIndex(o => o.id == Id);
          this.users[index] = user;
        })
        alert("Updated");
        window.location.reload();
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

}