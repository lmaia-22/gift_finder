import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { ProductService } from '../../../services/mdf/product/product.service';
import { FabricplanService } from '../../../services/mdf/fabricplan/fabricplan.service';
import { OperationService } from '../../../services/mdp/operation/operation.service';

import { Product } from '../../../models/mdf/product';
import { Fabricplan } from '../../../models/mdf/fabricplan';
import { Operation } from '../../../models/mdp/operation'; 

@Component({
  selector: 'app-fabricplan',
  templateUrl: './fabricplan.component.html',
  styleUrls: ['./fabricplan.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FabricplanComponent implements OnInit {


  fabricplans: Fabricplan[];
  products: Product[];
  prod: Array<String> = [];
  closeResult: string;

  //operation name
  oper_desc: Array<String> = [];
  operation: Operation[];
  empt: Array<String> = ['Doenst exist'];

  //select operation
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  operations: Operation[];

  //modal windows
  fabricplan: Fabricplan;

  //new
  desc: string;
  op: Array<number> = [];
  datestart: Date;
  duration:number;

  //edit
  editdescription: string;
  editoperToView: Array<number> = [];
  editoper: Array<number> = [];
  editdate: string;

  constructor(private fabricplanservice: FabricplanService,
    private operationservice: OperationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {

    this.fabricplanservice.getfabricplans().subscribe(fabricplans => {
      this.fabricplans = fabricplans;
      });
      
      this.operationservice.getOperations().subscribe(operation => {
        this.operations = operation;
      });
    }
 //Open edit pop-up
 open(content, id) {

  this.editoperToView = []

  this.fabricplanservice.getfabricplan(id).subscribe(fabricplan=> {
    this.fabricplan = fabricplan;
    var o = this.fabricplan['operationsIds'];
    //here
    console.log(o)

    o.forEach(operation => {
      this.operationservice.getOperation(operation).subscribe(oper => {
        this.editoperToView.push(oper.id); 
      });
    });

});
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    return  `with: ${reason}`;
  }
}

delete(id): void {
  this.fabricplanservice.deleteFabricPlan(id).subscribe(
    () => {
      var index = this.fabricplans.findIndex(f => f.id == id);
      this.operations.slice(index,1);
    })
    window.location.reload();
}

addOperationsToList(id:number, isChecked: boolean) {
  if(isChecked) {
    this.op.push(id);
  } else {
    let index = this.op.indexOf(id);
    this.op.splice(index,1);
  }
}

editOperationsToList(id:number, isChecked: boolean) {
  if(isChecked) {
    this.editoper.push(id);
  } else {
    let index = this.editoper.indexOf(id);
    this.editoper.splice(index,1);
  }
}

//POST
onSubmit(): void{
    const newFabricPlan: Fabricplan = { 
      description: this.desc,
      operationsIds: this.op,
      dateStart: this.datestart,
      duration: this.duration,
    } as Fabricplan;
     this.fabricplanservice.postFabricPlan(newFabricPlan)
       .subscribe(fabricplan => this.fabricplans.push(fabricplan));
}

//PUT
putFabricPlan(){ 
  const editFabricPlan: Fabricplan = {  
      description: this.fabricplan.description,
      operationsIds: this.editoper,
      dateStart: this.fabricplan.dateStart,
      duration: this.fabricplan.duration,
    } as Fabricplan;
      this.fabricplanservice.updateFabricPlan(this.fabricplan.id, editFabricPlan)
        .subscribe(fabricplan => {
          var index = this.fabricplans.findIndex(o => o.id == this.fabricplan.id);
          this.fabricplans[index] = fabricplan;
        })
        window.location.reload();
      }

      getOperationDescription(id) {
        var index = this.operations.findIndex(o => o.id == id);
        return this.operations[index].description;
      }
}

