import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { TypeMachineService } from '../../../services/mdp/typemachine/typemachine.service';
import { TypeMachine } from '../../../models/mdp/typemachine';
import { OperationService } from '../../../services/mdp/operation/operation.service';
import { Operation } from '../../../models/mdp/operation';
import { Machine } from '../../../models/mdp/machine';
import { NgForm } from '@angular/forms';
import { MachineService } from 'src/app/services/mdp/machine/machine.service';
import { element } from 'protractor';
import { type } from 'os';
import { isRegExp } from 'util';

@Component({
  selector: 'app-typemachine',
  templateUrl: './typemachine.component.html',
  styleUrls: ['./typemachine.component.css']
})
export class TypemachineComponent implements OnInit {

  typemachines:TypeMachine[];
  operations: Operation[];
  closeResult: string;
  description:string;
  machines: Machine[];
  //operationsIds: Array<number> = [];

  //machines of type machine
  typemachine: TypeMachine;
  mach: Machine;
  machine:number;
  machine_desc: Array<number> = [];
 
   //new
   desc: string;
   op: Array<number> = [];
   datestart: Date;
 
   //edit
   editdescription: string;
   editoperToView: Array<number> = [];
   editoper: Array<number> = [];
   editdate: string;


  constructor(private typemachineservices: TypeMachineService,
    private activatedRoute: ActivatedRoute,
    private operationservices: OperationService,
    private machineservice: MachineService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.typemachineservices.getTypeMachines().subscribe(typemachines => {
      this.typemachines = typemachines;

      this.typemachines.forEach((typemachine) => {
        this.typemachineservices.getmachinesoftypemachine(typemachine.id).subscribe(machines => {
          var index = this.typemachines.findIndex(t => t.id == typemachine.id);
          this.typemachines[index].machinesIds = machines;
          this.typemachines = this.typemachines

        })
      })
    })

    this.operationservices.getOperations().subscribe(operation => {
      this.operations = operation;
    });
    this.machineservice.getMachines().subscribe(machine =>{
      this.machines = machine;
    });

  }

     //Open edit pop-up
 open(content, id) {
   
  this.typemachineservices.getTypeMachine(id).subscribe(typemachine => {
    this.typemachine = typemachine;
});

this.operationservices.getOperations().subscribe(operations => {
  this.operations = operations;
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
  this.typemachineservices.deleteTypeMachine(id).subscribe(
    () => {
      var index = this.typemachines.findIndex(o => o.id == id);
      this.typemachines.slice(index,1);
    })
    window.location.reload();
}

getOperationDescription(id) {
  if (id === undefined || !this.operations || !this.operations.length) { return ""; }
  var index = this.operations.findIndex(o => o.id == id);
  return this.operations[index].description;
}

getMachineDescription(typeMachineid) {
  var response = ""

  var ola = this.machines.map((m) =>{

    if(m && m.idTypeMachine === typeMachineid && m.description) {
      return m.description + " "
    } else {
      return ""
    }
  } );

  return ola.toString().split(',').join(" \n ")


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
  console.log(this.desc, this.op);
    const newTypeMachine: TypeMachine = { 
      description: this.desc,
      operationsIds: this.op
    } as TypeMachine;
     this.typemachineservices.postTypeMachine(newTypeMachine)
       .subscribe(typemachine => this.typemachines.push(typemachine));
}

//PUT
putTypeMachine(){ 
  const editTypeMachine: TypeMachine = {  
        description: this.typemachine.description,
        operationsIds: this.editoper
        } as TypeMachine;
      this.typemachineservices.updateTypeMachine(this.typemachine.id, editTypeMachine)
        .subscribe(typemachine => {
          var index = this.typemachines.findIndex(t => t.id == this.typemachine.id);
          this.typemachines[index] = typemachine;
        })
       // window.location.reload();
      }
}