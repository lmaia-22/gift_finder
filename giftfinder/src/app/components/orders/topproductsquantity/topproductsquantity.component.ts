import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { OrderService } from '../../../services/orders/order/order.service';
import { Rank } from 'src/app/models/orders/rank';
import { ProductService } from 'src/app/services/mdf/product/product.service';
import {NeworderComponent } from 'src/app/components/orders/neworder/neworder.component';

@Component({
  selector: 'app-topproductsquantity',
  templateUrl: './topproductsquantity.component.html',
  styleUrls: ['./topproductsquantity.component.css']
})
export class TopproductsquantityComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

    role:string = localStorage.getItem('role');
    actions:string = localStorage.getItem('actions');
    permissions;
    ranks: Rank[];
    
  ngOnInit() {
    this.permissions = JSON.parse(this.actions);
    this.orderservice.mostorderedproductsbyquantity().subscribe(rank => {
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
