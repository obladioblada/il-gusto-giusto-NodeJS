import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {Event, NavigationStart, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {User} from "../../auth/user.model";

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
  user: any;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private router: Router,
              private authService:AuthService) {
      this.user  = { local: {name:''}};
  }

  ngOnInit() {
    this.showDrowDown = false;
    this.navbar = this.elementRef.nativeElement.querySelector('svg');
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart ) {
        this.isHome = e.url === '/';
        this.showLogin = e.url !=='/signIn' && e.url !=='/signUp';
      }
    });
    if (!this.isHome) {
      this.renderer.setStyle(this.navbar, 'background-color:', 'white');
      }

      this.authService.usrEvent.subscribe((event: Event) =>{
          this.user = this.authService.user;
      });
    if(this.isLoggedIn()) this.user = JSON.parse(localStorage.getItem('user'));
  }


  toggleDropDownMenu() {
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

    // save when leavaing app
    @HostListener('window:beforeunload', ['$event'])
    saveUserOnLocal() {
      if(this.isLoggedIn()){
          localStorage.setItem('user', JSON.stringify(this.user));
      }
    }


}
