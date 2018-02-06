import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Event, NavigationStart, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDrowDown;
  urls = [
    { url: 'prenota',
      name: 'PRENOTA'
    },
    { url: 'chi',
      name: 'CHI SIAMO'
    },
    { url: 'dove',
      name: 'DOVE SIAMO'
    }
    ];
  isHome: boolean;
  navbar: any;
  showLogin = true;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private router: Router,
              private authService:AuthService) {  }

  ngOnInit() {
    this.showDrowDown = false;
    this.navbar = this.elementRef.nativeElement.querySelector('svg');
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart ) {
        console.log(e.url);
        this.isHome = e.url === '/';
        this.showLogin = e.url !=='/signIn' && e.url !=='/signUp';
      }
    });
    if (!this.isHome) {
      this.renderer.setStyle(this.navbar, 'background-color:', 'white');
      }
  }


  toggleDropDownMenu() {
     // console.log('togglwe DropDown');
     this.showDrowDown = !this.showDrowDown;
  }

  onChangePage(url: string) {
    this.showDrowDown = false;
    this.router.navigate(['/', url]);

  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn(){
   return this.authService.isLoggedIn()
  }


}
