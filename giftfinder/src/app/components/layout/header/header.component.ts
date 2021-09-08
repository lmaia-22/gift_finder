import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/orders/authentication/authentication.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
  private authenticationService: AuthenticationService ) { }
  
  ngOnInit() {
  // reset login status
  //this.authenticationService.logout();
  }
}
