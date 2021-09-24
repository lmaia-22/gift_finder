import { Component, OnInit } from '@angular/core';
import { faFacebook, faGithub, faGoogle, faInstagram, faLinkedin, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  
  constructor() { }

  ngOnInit(): void {
  }

}
