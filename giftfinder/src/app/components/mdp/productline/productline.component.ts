import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm, FormBuilder} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { ProductLineService } from '../../../services/mdp/productline/productline.service';
import { ProductLine } from '../../../models/mdp/productline';
import { MachineService } from '../../../services/mdp/machine/machine.service';
import { Machine } from '../../../models/mdp/machine';

@Component({
  selector: 'app-productline',
  templateUrl: './productline.component.html',
  styleUrls: ['./productline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductlineComponent implements OnInit {

  productlines:ProductLine[];
  machines:Machine[];

  //new
  desc: string;
  machine: Array<number> = [];
  prodlinenumber: number;
  dateOperS: Date;
  dateOperF: Date;
  dailyProd: number;
  ative: boolean;
  op: Array<number> = [];

  //edit modal
  productline: ProductLine;
  closeResult: string;
  mach:Machine;
  editdesc: string;
  editactiv: boolean;

  //operation name
  machine_desc: Array<String> = [];
  mac: Machine[];
  empt: Array<String> = ['Doenst exist'];

  //select operation
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  machiness: Machine[];

  //edit
  editdescription: string;
  editoperToView: Array<number> = [];
  editoper: Array<number> = [];
  editdate: string;

  constructor(private productlineservice: ProductLineService,
  private machineservice: MachineService,
  private modalService: NgbModal,) { }

  ngOnInit() {
    this.productlineservice.getProductLines().subscribe(productline => {
      this.productlines = productline;
      console.log(this.productlines);
    });
    this.machineservice.getMachines().subscribe(machine => {
      this.machines = machine;
      console.log(this.machines);
    });
  }

 //POST
 onSubmit(f: NgForm): void{ 
  const newProductLine: ProductLine = {  
    description: this.desc,  // this.productline.description??
    machinesIds: this.machine,
    productionLineNumber: this.prodlinenumber,
    dateOperationStarted: this.dateOperS,
    dateOperationFinished: this.dateOperF,
    dailyProductionCapacity: this.dailyProd,
    active: this.ative } as ProductLine;
  this.productlineservice.postProductLine(newProductLine)
    .subscribe(productline => this.productlines.push(productline));
}

addMachinesToList(id:number, isChecked: boolean) {
  if(isChecked) {
    this.machine.push(id);
  } else {
    let index = this.machine.indexOf(id);
    this.machine.splice(index,1);
  }
}

//Open edit pop-up
open(content, id) {
  this.editoperToView = []
//console.log(id);
this.productlineservice.getProductLine(id).subscribe(productline => {
  this.productline = productline;
//console.log(this.productline);
var m = this.productline['machinesIds'];
    m.forEach(machine => {
  this.machineservice.getMachine(machine).subscribe(machin => {
    this.editoperToView.push(machin.id);
  }); 
});
});
this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});

}


//Edit
putProductionLine() {
  const editproductline: ProductLine = {  
    description: this.productline.description,
    machinesIds: this.editoper,
    productionLineNumber: this.productline.productionLineNumber,
    dateOperationStarted: this.productline.dateOperationStarted,
    dateOperationFinished: this.productline.dateOperationFinished,
    dailyProductionCapacity: this.productline.dailyProductionCapacity,
    active: this.editactiv
  } as ProductLine;
  this.productlineservice.updateProductLine(this.productline.id, editproductline)
    .subscribe(productline => {
      var index = this.productlines.findIndex(o => o.id == this.productline.id);
      this.productlines[index] = productline;
    })
}

editMachinesToList(id:number, isChecked: boolean) {
  if(isChecked) {
    this.editoper.push(id);
  } else {
    let index = this.editoper.indexOf(id);
    this.editoper.splice(index,1);
  }
}

getMachineDescription(Machineid) {
  var response = ""

  var ola = this.machines.map((m) =>{

    if(m && m.machinesIds === Machineid && m.description) {
      return m.description + " "
    } else {
      return ""
    }
  })
  ;

  return ola.toString().split(',').join(" \n ")
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

delete(): void {
  this.productlineservice.deleteProductLine(this.productline.id).subscribe(
    () => {
      var index = this.productlines.findIndex(f => f.id == this.productline.id);
      this.productlines.slice(index,1);
    })
    window.location.reload();
}
}