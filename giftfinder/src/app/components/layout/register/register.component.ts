import { Component, OnInit } from '@angular/core';
import {NgForm, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/orders/user';
import { UserService } from 'src/app/services/orders/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private userservice: UserService,
    private router: Router) { }

  users:User[];

   //new
   name:string;
   email:string;
   address:string;
   password:string;

  ngOnInit() {
  }

  onSubmit(f: NgForm): void{ 
    const newUser: User = {  
      name: this.name,
      email: this.email,
      address: this.address,
      password: this.password} as User;
      console.log(newUser);
    this.userservice.postUser(newUser)
      .subscribe(user => this.users.push(user));
      this.router.navigate(['/login']);
    }


}
