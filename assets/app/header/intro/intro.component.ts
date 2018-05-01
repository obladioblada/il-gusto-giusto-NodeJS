import {Component, ElementRef, Injectable, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Event, NavigationStart, Router} from '@angular/router';
import {IntroService} from '../../services/intro.service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.css']
})

@Injectable()
export class IntroComponent implements OnInit {

    drawingFished = false;
    svg: any;
    brandAnimationTime = 2;
    isHome: boolean;
    skipIntro: boolean;
    @ViewChild('intro') intro: ElementRef;

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router, private introService: IntroService) {
    }

    ngOnInit(): void {

        this.svg = this.intro.nativeElement;
        this.router.events.subscribe((e: Event) => {
            if (e instanceof NavigationStart) {
                this.isHome = e.url === '/';
                // console.log('isHome' + this.isHome);
                if (this.isHome) {
                    this.renderer.setStyle(this.svg, 'transition', 'all ' + this.brandAnimationTime + 's');
                    this.renderer.setStyle(this.svg, 'WebkitTransition', 'all ' + this.brandAnimationTime + 's');
                } else {
                    this.drawingFished = true;
                }
            }
        });

        // subscribing for SkipIntro Event
        this.introService.skipIntroEvent.subscribe(event => {
            this.renderer.setStyle(this.svg, 'transition', 'none');
            this.renderer.setStyle(this.svg, 'WebkitTransition', 'none');
            this.drawingFished = true;
        });
    }


    onDrawingFinished() {
        if (this.isHome && !this.skipIntro) {
            this.renderer.setStyle(this.svg, 'transition', 'all ' + this.brandAnimationTime + 's');
            this.renderer.setStyle(this.svg, 'WebkitTransition', 'all ' + this.brandAnimationTime + 's');
            setTimeout(() => {
                this.introService.skipIntroEvent.emit(true);
            }, this.brandAnimationTime * 1000);
        } else {
            this.renderer.setStyle(this.svg, 'transition', 'none');
            this.renderer.setStyle(this.svg, 'WebkitTransition', 'none');
        }
        this.drawingFished = true;
    }
}
