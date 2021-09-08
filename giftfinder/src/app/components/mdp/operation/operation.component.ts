import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { OperationService } from '../../../services/mdp/operation/operation.service';
import { Operation } from '../../../models/mdp/operation';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  operations:Operation[];

  constructor(private operationservice: OperationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) { }

    //edit & new
    operation:Operation;
    closeResult: string;
    description:string;

  ngOnInit() {
    this.operationservice.getOperations().subscribe(operation => {
      this.operations = operation;
  });

}
 //Open edit pop-up
 open(content, id) {
  console.log(id);
  this.operationservice.getOperation(id).subscribe(operation => {
  this.operation = operation;
  console.log(this.operation);
});

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


//POST
onSubmit(f1: NgForm): void{ 
  console.log(this.description)
    // The server will generate the id for this new hero
    const newOperation: Operation = {  
      description: this.description
    } as Operation;
    this.operationservice.postOperation(newOperation)
      .subscribe(operation => this.operations.push(operation));
}

//PUT
putOperation(Id){
  console.log(Id);    
  const editOperation: Operation = {  
        description: this.description
      } as Operation;
      this.operationservice.updateOperation(Id, editOperation)
        .subscribe(operation => {
          var index = this.operations.findIndex(o => o.id == Id);
          this.operations[index] = operation;
        })
       // window.location.reload();
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
  this.operationservice.deleteOperation(id).subscribe(
    () => {
      var index = this.operations.findIndex(o => o.id == id);
      this.operations.slice(index,1);
    })
    window.location.reload();
}

}