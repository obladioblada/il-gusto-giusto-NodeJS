import {Component, OnInit} from '@angular/core';
import {IntroService} from '../services/intro.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  showFirstimg: boolean;
  showSecondtimg: boolean;
  closeFooter: boolean;

  constructor(private introService: IntroService) {
    this.showFirstimg = false;
    this.showSecondtimg = false;
    this.closeFooter = false;
  }


  ngOnInit() {
    // subscribing for SkipIntro Event
    this.introService.skipIntroEvent.subscribe(event => {
      this.showFirstimg = true;
      this.showSecondtimg = true;
      this.closeFooter = true;
    });
  }

  onSkipIntro() {
    this.introService.skipIntroEvent.emit(true);
    this.showFirstimg = true;
    this.showSecondtimg = true;
    this.closeFooter = true;
  }

}
