import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Container, Main } from 'ng-particles';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: '#c6ecff'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})

export class HomeComponent implements OnInit {

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'buffer';
  value = 50;
  bufferValue = 25;


  id = "tsparticles";
    
  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = "https://particles.js.org/samples/presets/links.json";

  options = {
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#1c2140","#524b41","#877442", "#bd9e43", "#f2c744"]
      },
      links: {
        enable: true,
        color: "#000"
      },
      move: {
        enable: true
      }
    }
  };
  
   constructor() { }

    particlesLoaded(container: Container): void {
      console.log(container);
    }

    particlesInit(main: Main): void {
        console.log(main);
        
        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    }

  ngOnInit(): void {

    
  }
  

}
