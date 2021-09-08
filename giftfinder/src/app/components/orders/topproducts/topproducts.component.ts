import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { NeworderComponent } from '../neworder/neworder.component';
import { OrderService } from '../../../services/orders/order/order.service';
import { Rank } from 'src/app/models/orders/rank';
import { ProductService } from 'src/app/services/mdf/product/product.service';

@Component({
  selector: 'app-topproducts',
  templateUrl: './topproducts.component.html',
  styleUrls: ['./topproducts.component.css']
})
export class TopproductsComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

    role:string = localStorage.getItem('role');
    user_id:string = localStorage.getItem('user').slice(1,-1);

    //edit & new
    closeResult: string;
    ranks: Rank[];
    actions:string = localStorage.getItem('actions');
    permissions;

  ngOnInit() {
    this.permissions = JSON.parse(this.actions);
    this.orderservice.getmostorderesproducts().subscribe(rank => {
      this.ranks = rank;
      console.log(this.ranks);
    });
  }

  openew(id) {
    if(this.role === "1" && this.permissions[0].NewOrder === 1){
    const modalRef = this.modalService.open(NeworderComponent, {size:"lg"});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'neworder';
  }else{
    alert('No Access');
  }
}

}
