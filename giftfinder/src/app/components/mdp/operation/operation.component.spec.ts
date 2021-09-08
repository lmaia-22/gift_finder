import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { OperationService } from '../../../services/mdp/operation/operation.service';
import { Operation } from '../../../models/mdp/operation';

@Component({
  selector: 'app-machine',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  operations:Operation[];

  constructor(private operationservice: OperationService) { }

  ngOnInit() {
    this.operationservice.getOperations().subscribe(operation => {
      this.operations = operation;
      console.log(this.operations)
  });

}
}