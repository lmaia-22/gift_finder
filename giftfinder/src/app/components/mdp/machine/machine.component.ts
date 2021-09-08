import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { TypeMachineService } from '../../../services/mdp/typemachine/typemachine.service';
import { MachineService } from '../../../services/mdp/machine/machine.service';
import { Machine } from '../../../models/mdp/machine';
import { TypeMachine } from '../../../models/mdp/typemachine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  constructor(private machineservice: MachineService,
    private typeofmachineservice: TypeMachineService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

    // new
    machines:Machine[];
    closeResult: string;
    idType: number;
    brand:string;
    model: string;
    localization: string;
    desc: string;
    inspecDate: Date;
    statusOper: boolean;

    //view select
    typeofmachines: TypeMachine[];

    //view
    machine: Machine;
    type_desc: Array<String> = [];
    empt: ['Doesnt exist'];
    typeofmachine: TypeMachine;

  ngOnInit() {
    this.machineservice.getMachines().subscribe(machine => {
      this.machines = machine;
      console.log(this.machines);
      const types_desc$ = this.machines.map( element => 
        this.typeofmachineservice.getTypeMachine(element.idTypeMachine).pipe(
        // map it to the value you want
        map((response) => {
          this.typeofmachine = response;
          return this.typeofmachine['description'];
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
        forkJoin(types_desc$).subscribe((types_desc) => this.type_desc = types_desc); 
        console.log(this.type_desc);
      });
        this.typeofmachineservice.getTypeMachines().subscribe(typemachines => {
          console.log("typemachines", typemachines)
          this.typeofmachines = typemachines;
        });
}

 //Open edit pop-up
 open(content, id) {
  this.machineservice.getMachine(id).subscribe(machine => {
  this.machine = machine;

});

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


POST
onSubmit(): void{
    const newMachine: Machine = { 
      idTypeMachine: this.idType,
      brand: this.brand,
      model: this.model,
      localization: this.localization,
      description: this.desc,
      inspectionDate: this.inspecDate,
      statusOperational: this.statusOper
    } as Machine;
     this.machineservice.postMachine(newMachine)
       .subscribe(machine => this.machines.push(machine));
}

//PUT
putMachine(){
  const editMachine: Machine = { 
    idTypeMachine: this.machine.idTypeMachine,
    brand: this.machine.brand,
    model: this.machine.model,
    localization: this.machine.localization,
    description: this.machine.description,
    inspectionDate: this.machine.inspectionDate,
    statusOperational: this.machine.statusOperational
  } as Machine;
  this.machineservice.updateMachine(this.machine.id, editMachine)
    .subscribe(machine => {
      var index = this.machines.findIndex(o => o.id == this.machine.id);
      this.machines[index] = machine;
    })
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

deletemachine(): void {
  this.machineservice.deleteMachine(this.machine.id).subscribe(
    () => {
      var index = this.machines.findIndex(o => o.id == this.machine.id);
      this.machines.slice(index,1);
    })
    window.location.reload();
}

}